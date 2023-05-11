const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const { ObjectId } = require("mongodb");

app.use(express.json());
app.use(cors());

const client = require("./client");

async function getContacts(page = 1) {
    try {
        var data = [];
        const LIMIT = 5;
        const offset = (page - 1) * LIMIT;
        const database = client.db("contacts-app");
        const contacts = database.collection("contacts");
        const cursor = contacts.find({}).skip(offset).limit(LIMIT);
        var total = await contacts.countDocuments({});
        var totalPages = Math.ceil(total / LIMIT);
        for await (const contact of cursor) {
            data.push(contact);
        }
    } catch (error) {
        console.error(error);
    } finally {
        return {totalPages, data};
    }
}

async function storeContact(contact) {
    try {
        const database = client.db("contacts-app");
        const contacts = database.collection("contacts");
        const result = await contacts.insertOne(contact);
        console.log(`New contact created with the following id: ${result.insertedId}`);
    } catch (error) {
        console.error(error);
    }
}

async function deleteContact(contactId) {
    try {
        const database = client.db("contacts-app");
        const contacts = database.collection("contacts");
        await contacts.deleteOne({_id: new ObjectId(contactId)});
    } catch (error) {
        console.error(error);
    }
}

async function updateContact(contactId, contactData) {
    try {
        const database = client.db("contacts-app");
        const contacts = database.collection("contacts");
        await contacts.updateOne({_id: new ObjectId(contactId)}, {$set: contactData});
    } catch (error) {
        console.error(error);
    }
}

app.post("/contacts", async (req, res) => {
    await storeContact(req.body);
    res.json({ message: "Contact stored" });
});

app.get("/contacts", async (req, res) => {
    const page = req.query.page || 1;
    const {totalPages, data} = await getContacts(page);
    res.json({totalPages, data});
});

app.delete("/contacts/:id", async (req, res) => {
    await deleteContact(req.params.id);
    res.json({ message: "Contact deleted" });
});

app.put("/contacts/:id", async (req, res) => {
    const data = req.body;
    const contactId = req.params.id;
    await updateContact(contactId, data);
    res.json({ message: "Contact updated" })
})

const server = http.createServer(app);
server.listen(3000, () => console.log("listening on *:3000"));