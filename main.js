import express from "express"
import http from "http"
import { Server } from "socket.io"
import createControllerLobby from "./public/Entities/Lobby.js"

const app = express()
const server = http.createServer(app)
const sockets = new Server(server)
const port = 3000

const lobby = createControllerLobby()

sockets.on("connection", (socket) => {
    const userId = socket.id
    console.log(`Console: User ${userId} connected!`);

    lobby.users.createUser({ userId: userId })

    socket.emit("setup", { state: lobby.state })

    sockets.emit("user-connected", { users: lobby.state.users })

    socket.on("disconnect", () => {
        console.log(`Console: User ${userId} disconnected!`);
        lobby.users.removeUser({ userId: userId })

        sockets.emit("user-disconnected", { users: lobby.state.users })
    })

    socket.on("rename-user", (command) => {
        console.log(`Console: ${lobby.state.users[command.userId].name} rename to ${command.name}`);
        lobby.users.renameUser(command)

        sockets.emit("rename-user", { userId: lobby.state.users[command.userId].id, name: lobby.state.users[command.userId].name })
    })

    socket.on("send-post", (command) => {

    })
})

app.use(express.static("public"))

server.listen(port, () => {
    console.log(`Console: Server running on port ${port}!`)

    lobby.servers.createServer({ id: null, name: "Servidor A" })
    lobby.servers.createServer({ id: null, name: "Servidor B" })
    lobby.servers.createServer({ id: null, name: "Servidor C" })
    lobby.servers.createServer({ id: null, name: "Servidor D" })
    lobby.servers.createServer({ id: null, name: "Servidor E" })
})
