import express from "express"
import http from "http"
import { Server } from "socket.io"
import controlMain from "./public/Controllers/ControlMain.js"

const app = express()
const server = http.createServer(app)
const sockets = new Server(server)
const port = 3000

const main = new controlMain()

app.use(express.static("public"))

server.listen(port, () => {
    console.log(`Console: Server running on port ${port}!`)
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
})
