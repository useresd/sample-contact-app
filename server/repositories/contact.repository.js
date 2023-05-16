const client = require("./../config/mongodb");
const { ObjectId } = require("mongodb");

module.exports = {
    get,
    getById,
    store,
    update,
    deleteById
}

async function getById(contactId) {
    const database = client.db("contacts-app");
    const contacts = database.collection("contacts");
    const contact = await contacts.findOne({_id: new ObjectId(contactId)});
    return contact;
}

async function get(page = 1, {name, phone, address, notes}) {
    const database = client.db("contacts-app");
    const contacts = database.collection("contacts");

    var data = [];
    const LIMIT = 5;
    const offset = (page - 1) * LIMIT;        

    const cursor = contacts.find({name: {$regex: name}, phone: {$regex: phone}, address: {$regex: address}, notes: {$regex: notes}}).skip(offset).limit(LIMIT);
    var total = await contacts.countDocuments({});
    var totalPages = Math.ceil(total / LIMIT);
    data = await cursor.toArray();
    return {totalPages, data};
}

async function store(contact) {
    const database = client.db("contacts-app");
    const contacts = database.collection("contacts");
    const result = await contacts.insertOne(contact);
}

async function deleteById(contactId) {
    const database = client.db("contacts-app");
    const contacts = database.collection("contacts");
    await contacts.deleteOne({_id: new ObjectId(contactId)});
}

async function update(contactId, contactData) {
    const database = client.db("contacts-app");
    const contacts = database.collection("contacts");
    await contacts.updateOne({_id: new ObjectId(contactId)}, {$set: contactData});
}