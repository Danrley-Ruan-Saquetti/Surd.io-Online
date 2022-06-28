import ControlInputListener from "./Controllers/ControlInputListener.js"
import ControlMain from "./Controllers/ControlMain.js"
import ControlModelView from "./Controllers/ControlModelView.js"

const socket = io()

const controlMain = ControlMain()
const controlInputListener = ControlInputListener()
const controlModelView = ControlModelView()

let userCode

socket.on("connect", () => {
    socket.on("setup", (command) => {
        userCode = command.code
        controlMain.setup(command.state)

        const user = {
            code: userCode,
            getName: () => {
                return controlMain.getState().users[userCode].name
            }
        }

        controlModelView.registerUser(user)
        const state = {
            users: command.state.users,
            servers: command.state.servers,
            posts: {}
        }

        controlModelView.setup(state)
        controlModelView.userTag({ name: controlMain.getState().users[userCode].name })
        controlModelView.setContUsers({ contUsers: controlMain.getContUsers() })
        controlInputListener.registerUser(user)
        controlInputListener.subscribeObserver((type, command) => {
            socket.emit(type, command)
        })
    })

    socket.on("user-connected", (command) => {
        if (socket.id == command.id) { return }
        const code = controlMain.createUser(command).code
        controlModelView.addUser(controlMain.getState().users[code])
        controlModelView.setContUsers({ contUsers: controlMain.getContUsers() })
    })

    socket.on("user-disconnected", (command) => {
        controlMain.removeUser(command)
        controlModelView.removeUser(command)
        controlModelView.setContUsers({ contUsers: controlMain.getContUsers() })
    })

    socket.on("user-rename", (command) => {
        controlMain.renameUser(command)
        controlModelView.renameUser({ code: command.code, name: command.newName })
    })

    socket.on("user-change-server", (command) => {
        controlMain.userEnterGame(command)
        controlModelView.userEnterGame(command)
    })

    socket.on("user-send-post", (command) => {
        controlMain.createPost(command)
        controlModelView.addPost(command)
    })
})

window.onload = () => {
    controlInputListener.initialComponents()
}
