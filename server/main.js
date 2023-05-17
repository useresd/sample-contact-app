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
const { verifyToken } = require("./utils/token");

app.use(express.json());
app.use(cors());

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT"]
    }
});

io.use((socket, next) => {
    try {
        let auth = socket.handshake.auth;
        const {  sub: username } = verifyToken(auth?.token.trim());
        socket.data.username = username;
        next();
    } catch(error) {
        next(error);
    }
})

io.on("connection", (socket) => {
    
    socket.on("lock-contact", async ({contactId}) => {

        const sockets = await io.fetchSockets();

        sockets.filter(each => each.data.username != socket.data.username).forEach(receiver => {
            receiver.emit("contact-locked", {contactId});
        })
    
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