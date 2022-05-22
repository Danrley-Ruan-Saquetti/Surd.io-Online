import express from "express"
import http from "http"
import { Server } from "socket.io"
import createControllerLobby from "./public/Entities/Lobby.js"
import createGeneratedCodigo from "./public/GeneratedCodigo.js"

const app = express()
const server = http.createServer(app)
const sockets = new Server(server)
const port = 3000
const generateCodigo = createGeneratedCodigo

const lobby = createControllerLobby()

sockets.on("connection", (socket) => {
    const userId = socket.id
    console.log(`Console: User ${userId} connected!`);

    const codigo = lobby.users.createUser({ id: userId }).codigo

    socket.emit("setup", { state: lobby.state, codigo })

    sockets.emit("user-connected", { users: lobby.state.users })

    socket.on("disconnect", () => {
        console.log(`Console: User ${userId} disconnected!`);
        lobby.users.removeUser({ codigo })

        sockets.emit("user-disconnected", { users: lobby.state.users })
    })

    socket.on("rename-user", (command) => {
        console.log(`Console: ${lobby.state.users[command.codigo].name} rename to ${command.name}!`);
        lobby.users.renameUser(command)

        sockets.emit("rename-user", { id: lobby.state.users[command.id].id, name: lobby.state.users[command.id].name })
    })

    socket.on("send-post", (command) => {
        lobby.chats.posts.createPost(command)
        console.log(command)
        console.log(`Console: ${lobby.state.users[command.userCodigo].id} send post on server ${command.where}!`);
    })
})

app.use(express.static("public"))

server.listen(port, () => {
    console.log(`Console: Server running on port ${port}!`)

    lobby.chats.createChat({ id: null, where: "lobby" })

    lobby.servers.createServer({ id: null, name: "Servidor A" })
    lobby.servers.createServer({ id: null, name: "Servidor B" })
    lobby.servers.createServer({ id: null, name: "Servidor C" })
    lobby.servers.createServer({ id: null, name: "Servidor D" })
    lobby.servers.createServer({ id: null, name: "Servidor E" })
})
