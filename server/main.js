const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const { ObjectId } = require("mongodb");
const { Server } = require("socket.io");
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(express.json());
app.use(cors());

require('dotenv').config()

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT"]
    }
});

io.on("connection", (socket) => {    
    
    socket.on("lock-contact", ({contactId, username}) => {
        io.emit("contact-locked", {contactId, username});
    })

    socket.on("unlock-contact", async ({contactId}) => {
        const contact = await getContactbyId(contactId);
        io.emit("contact-unlocked", {contactId, contact});
    })
})

async function getContactbyId(contactId) {
    try {
        const database = client.db("contacts-app");
        const contacts = database.collection("contacts");
        const contact = await contacts.findOne({_id: new ObjectId(contactId)});
        return contact;

    } catch (error) {
        console.error(error);
    }
}

async function getContacts(page = 1, {name, phone, address, notes}) {
    try {
        const database = client.db("contacts-app");
        const contacts = database.collection("contacts");

        var data = [];
        const LIMIT = 5;
        const offset = (page - 1) * LIMIT;        

        const cursor = contacts.find({name: {$regex: name}, phone: {$regex: phone}, address: {$regex: address}, notes: {$regex: notes}}).skip(offset).limit(LIMIT);
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
    const {name, phone, address, notes} = req.query;
    const {totalPages, data} = await getContacts(page, {name, phone, address, notes});
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

httpServer.listen(process.env.HTTP_PORT, () => console.log(`listening on *:${process.env.HTTP_PORT}`));