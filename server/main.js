const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

require('dotenv').config();

const defaultRouter = require("./routers/default.router");
const authRouter = require("./routers/auth.router");
const contactRepository = require("./repositories/contact.repository");
const errorsMiddleware = require("./middlewares/errors.middleware");

app.use(express.json());
app.use(cors());

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
    });

    socket.on("unlock-contact", async ({contactId}) => {
        const contact = await contactRepository.getById(contactId);
        io.emit("contact-unlocked", {contactId, contact});
    });
    
})

app.use(authRouter);
app.use(defaultRouter);

app.use(errorsMiddleware);

httpServer.listen(process.env.HTTP_PORT, () => console.log(`listening on *:${process.env.HTTP_PORT}`));