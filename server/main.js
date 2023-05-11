const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const client = require("./client");

// a function that connects to mongodb and retreve a collection of contacts
async function getContacts() {
    try {
        var result = [];
        const database = client.db("contacts-app");
        const contacts = database.collection("contacts");
        const cursor = contacts.find({});
        for await (const contact of cursor) {
            result.push(contact);
        }
    } catch (error) {
        console.error(error);
    } finally {
        return result;
    }
}

async function storeContact() {
    try {
        const database = client.db("contacts-app");
        const contacts = database.collection("contacts");
        const contact = {
            name: "Jane Doe",
            phone: "666-666-6666",
            address: "123 Fake St",
            notes: "This is a test note"
        };
        const result = await contacts.insertOne(contact);
        console.log(`New contact created with the following id: ${result.insertedId}`);
    } catch (error) {
        console.error(error);
    }
}

app.post("/contacts", async (req, res) => {
    await storeContact();
    res.json({ message: "Contact stored" });
});

app.get("/contacts", async (req, res) => {
    const contacts = await getContacts();
    res.json(contacts);
    // res.json([
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         phone: "555-555-5555",
    //         address: "123 Fake St",
    //         notes: "This is a test note"
    //     },
    //     {
    //         id: "2",
    //         name: "Jane Doe",
    //         phone: "555-555-5555",
    //         address: "123 Fake St",
    //         notes: "This is a test note"
    //     },
    // ])
});

const server = http.createServer(app);
server.listen(3000, () => console.log("listening on *:3000"));