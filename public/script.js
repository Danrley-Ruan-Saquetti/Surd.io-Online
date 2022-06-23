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

        controlModelView.subscribeUser({ code: userCode })
        controlModelView.userList({ users: command.state.users })
        controlModelView.serverList({ servers: command.state.servers })
        controlModelView.userTag({ name: controlMain.getState().users[userCode].name })
        controlInputListener.registerUser({
            code: userCode,
            getName: () => {
                return controlMain.getState().users[userCode].name
            }
        })
        controlInputListener.subscribeObserver((type, command) => {
            socket.emit(type, command)
        })
    })

    socket.on("user-connected", (command) => {
        if (socket.id == command.id) { return }
        const code = controlMain.createUser(command).code
        controlModelView.addUser(controlMain.getState().users[code])
    })

    socket.on("user-disconnected", (command) => {
        controlMain.removeUser(command)
        controlModelView.removeUser(command)
    })

    socket.on("user-rename", (command) => {
        controlMain.renameUser(command)
        controlModelView.renameUser({ code: command.code, name: command.newName })
    })

    socket.on("user-change-server", (command) => {
        controlMain.changeServerUser(command)
    })
})

window.onload = () => {
    controlInputListener.initialComponents()
}
