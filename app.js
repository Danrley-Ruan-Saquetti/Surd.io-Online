import express from "express"
import http from "http"
import { Server } from "socket.io"
import ControlMain from "./public/Controllers/ControlMain.js"

const app = express()
const server = http.createServer(app)
const sockets = new Server(server)
const port = 3000

const controlMain = ControlMain()
const CODE_CHAT_MAIN = "11111111"

app.use(express.static("public"))

server.listen(port, () => {
    console.log(`Console: Server running on port ${port}!`)

    controlMain.subscribeObserver((type, command) => {
        sockets.emit(type, command)
    })

    controlMain.createChat({ code: CODE_CHAT_MAIN })

    const INITIALS = [`A`, `B`, `C`, `D`, `E`]

    INITIALS.forEach((initial) => {
        console.log(`Console: Server ${initial} created!`);
        const code = controlMain.createServer({ initial }).code
        controlMain.createChat({ code })
    })
})

sockets.on("connection", (socket) => {
    const id = socket.id
    console.log(`Console: User ${id} connected!`);

    const code = controlMain.createUser({ id }).code

    socket.emit("setup", { state: controlMain.getState(), code })

    socket.on("disconnect", () => {
        console.log(`Console: User ${id} disconnected!`);

        controlMain.removeUser({ code })
    })

    socket.on("user-rename", (command) => {
        console.log(`Console: User ${id} rename ${controlMain.getState().users[code].name} to ${command.newName}!`);

        controlMain.renameUser(command)
    })

    socket.on("user-change-server", (command) => {
        console.log(`Console: User ${id} change server ${controlMain.getState().users[code].serverConnected} to server ${command.newServer}!`)

        controlMain.changeServerUser(command)
    })

    socket.on("user-send-post", (command) => {
        console.log(`Console: User send post in the room ${command.chatCode}!`)

        controlMain.createPost(command)
    })
})
