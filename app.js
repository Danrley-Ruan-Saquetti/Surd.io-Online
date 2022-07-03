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

    const INITIALS = [`A`]

    INITIALS.forEach((initial) => {
        console.log(`Console: Game start in the Server ${initial}!`);
        const code = controlMain.createServer({ initial }).code
        controlMain.createChat({ code })
        controlMain.createGame({ code })
    })
})

const systemSendPost = (command) => {
    const postInfoUserDisconnected = {
        chatCode: command.chatCode ? command.chatCode : controlMain.getState().users[command.userCode].serverConnected == null ? CODE_CHAT_MAIN : controlMain.getState().users[command.userCode].serverConnected,
        userCode: command.userCode,
        username: controlMain.getState().users[command.userCode].name,
        type: "info",
        body: command.body
    }

    controlMain.createPost(postInfoUserDisconnected)
}

sockets.on("connection", (socket) => {
    const id = socket.id
    console.log(`Console: User ${id} connected!`);

    const code = controlMain.createUser({ id }).code

    socket.emit("setup", { state: controlMain.getState(), code, chatCode: CODE_CHAT_MAIN })

    systemSendPost({ userCode: code, body: `User connected.` })

    if (controlMain.getState().users[code].serverConnected != null) {
        systemSendPost({ chatCode: CODE_CHAT_MAIN, userCode: code, body: `User connected.` })
    }


    socket.on("disconnect", () => {
        console.log(`Console: User ${id} disconnected!`);

        systemSendPost({ chatCode: CODE_CHAT_MAIN, userCode: code, body: `User disconnected.` })

        if (controlMain.getState().users[code].serverConnected != null) {
            systemSendPost({ chatCode: controlMain.getState().users[code].serverConnected, userCode: code, body: `User disconnected.` })
        }

        controlMain.removeUser({ code })
    })

    socket.on("user-rename", (command) => {
        command.oldName = controlMain.getState().users[code].name
        console.log(`Console: User ${id} rename ${command.oldName} to ${command.newName}!`);

        controlMain.renameUser(command)
    })

    socket.on("user-send-post", (command) => {
        command.chatCode = controlMain.getState().users[code].serverConnected == null ? CODE_CHAT_MAIN : controlMain.getState().users[code].serverConnected
        console.log(`Console: User ${id} send post in the room ${command.chatCode}!`)
        command.username = controlMain.getState().users[code].name
        command.type = "post"
        controlMain.createPost(command)
    })

    socket.on("user-start-game", (command) => {
        console.log(`Console: User ${id} enter game in the server ${command.serverCode}!`);

        controlMain.userStartGame(command)

        systemSendPost({
            userCode: code,
            body: `User enter server.`
        })

        systemSendPost({
            chatCode: CODE_CHAT_MAIN,
            userCode: code,
            body: `User enter server ${controlMain.getState().servers[command.serverCode].name}.`
        })
    })

    socket.on("user-quit-game", (command) => {
        console.log(`Console: User ${id} quit game in the server ${command.serverCode}!`);
        controlMain.userQuitGame(command)

        systemSendPost({
            chatCode: command.serverCode,
            userCode: code,
            body: `User quit server.`
        })
    })

    socket.on("player-keypress", (command) => {
        controlMain.acceptKey(command)
    })
})
