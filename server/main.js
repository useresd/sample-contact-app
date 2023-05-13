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
    const database = client.db("contacts-app");
    const contacts = database.collection("contacts");
    const contact = await contacts.findOne({_id: new ObjectId(contactId)});
    return contact;
}

async function getContacts(page = 1, {name, phone, address, notes}) {
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
    return {totalPages, data};
}

async function storeContact(contact) {
    const database = client.db("contacts-app");
    const contacts = database.collection("contacts");
    const result = await contacts.insertOne(contact);
}

async function deleteContact(contactId) {
    const database = client.db("contacts-app");
    const contacts = database.collection("contacts");
    await contacts.deleteOne({_id: new ObjectId(contactId)});
}

async function updateContact(contactId, contactData) {
    const database = client.db("contacts-app");
    const contacts = database.collection("contacts");
    await contacts.updateOne({_id: new ObjectId(contactId)}, {$set: contactData});
}

app.post("/contacts", async (req, res, next) => {
    try {
        await storeContact(req.body);
        res.json({ message: "Contact stored" });
    } catch(error) {
        next(error);
    }
});

app.get("/contacts", async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const {name, phone, address, notes} = req.query;
        const {totalPages, data} = await getContacts(page, {name, phone, address, notes});
        res.json({totalPages, data});
    } catch (error) {
        next(error)
    }
});

app.delete("/contacts/:id", async (req, res, next) => {
    try {
        await deleteContact(req.params.id);
        res.json({ message: "Contact deleted" });
    } catch(error) {
        next(error);
    }
});

app.put("/contacts/:id", async (req, res, next) => {
    try {
        const data = req.body;
        const contactId = req.params.id;
        await updateContact(contactId, data);
        res.json({ message: "Contact updated" })
    } catch(error) {
        next(error)
    }
})

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).send(`Error: ${error.message}`);
})

httpServer.listen(process.env.HTTP_PORT, () => console.log(`listening on *:${process.env.HTTP_PORT}`));