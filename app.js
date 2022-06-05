import express from "express"
import http from "http"
import { Server } from "socket.io"
import ControlMain from "./public/Controllers/ControlMain.js"

const app = express()
const server = http.createServer(app)
const sockets = new Server(server)
const port = 3000

const main = new ControlMain()

app.use(express.static("public"))

server.listen(port, () => {
    console.log(`Console: Server running on port ${port}!`)

    const serverACode = main.createServer({ initial: "A" }).code
    console.log(`Console: Server ${serverACode} created!`)
    const serverBCode = main.createServer({ initial: "B" }).code
    console.log(`Console: Server ${serverBCode} created!`)
    const serverCCode = main.createServer({ initial: "C" }).code
    console.log(`Console: Server ${serverCCode} created!`)
    const serverDCode = main.createServer({ initial: "D" }).code
    console.log(`Console: Server ${serverDCode} created!`)
    const serverECode = main.createServer({ initial: "E" }).code
    console.log(`Console: Server ${serverECode} created!`)

    main.subscribeObserver((command) => {
        sockets.emit(command.type, command)
    })
})

sockets.on("connection", (socket) => {
    const userId = socket.id
    console.log(`Console: User ${userId} connected!`);

    const code = main.createUser({ id: userId }).code

    socket.emit("setup", { state: main.getState(), code })

    sockets.emit("user-connected", { id: userId, code })

    socket.on("disconnect", () => {
        console.log(`Console: User ${userId} disconnected!`);
        sockets.emit("user-disconnected", { code })
        main.removeUser({ code })
    })

    socket.on("user-rename", (command) => {
        console.log(`Console: User ${userId} rename ${command.user.name} to ${command.newName}`);
        sockets.emit("user-rename", command)
        main.renameUser(command)
    })
})
