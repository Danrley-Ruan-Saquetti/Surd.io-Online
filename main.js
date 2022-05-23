import express from "express"
import http from "http"
import { Server } from "socket.io"
import createLobby from "./public/Entities/Lobby.js"

const app = express()
const server = http.createServer(app)
const sockets = new Server(server)
const port = 3000

const lobby = createLobby()

sockets.on("connection", (socket) => {
    const userId = socket.id
    console.log(`Console: User ${userId} connected!`);

    const codigo = lobby.user.createUser({ id: userId }).codigo

    socket.emit("setup", { state: lobby.state, codigo })

    socket.on("disconnect", () => {
        console.log(`Console: User ${userId} disconnected!`);
        lobby.user.removeUser({ codigo: codigo })
    })
})

app.use(express.static("public"))

server.listen(port, () => {
    console.log(`Console: Server running on port ${port}!`)

    lobby.subscribeObserver((command) => {
        sockets.emit(command.type, command)
    })
})
