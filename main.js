import express from "express"
import http from "http"
import socketio from "socket.io"
import createControllerLobby from "./public/Entities/Lobby.js"

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)
const port = 3000

const lobby = createControllerLobby()

sockets.on("connection", (socket) => {
    const userId = socket.id
    console.log(`Console: User ${userId} connected!`);

    lobby.users.createUser({ id: userId })

    socket.emit("setup", { state: lobby.state })

    sockets.emit("user-connected", { users: lobby.state.users })

    socket.on("disconnect", () => {
        console.log(`Console: User ${userId} disconnected!`);
        lobby.users.removeUser({ id: userId })

        sockets.emit("user-disconnected", { users: lobby.state.users })
    })
})

app.use(express.static("public"))

server.listen(port, () => {
    console.log(`Console: Server running on port ${port}!`)
})
