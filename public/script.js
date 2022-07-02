import ControlInputListener from "./Controllers/ControlInputListener.js"
import ControlMain from "./Controllers/ControlMain.js"
import ControlModelView from "./Controllers/ControlModelView.js"
import ControlRendererGame from "./Controllers/ControlRendererGame.js"

const socket = io()

const controlMain = ControlMain()
const controlInputListener = ControlInputListener()
const controlModelView = ControlModelView()
const controlRendererGame = ControlRendererGame(document.getElementById("canvas"))

let userCode

socket.on("connect", () => {
    let chatCode
    socket.on("setup", (command) => {
        userCode = command.code
        chatCode = command.chatCode
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
        controlInputListener.subscribeClearListPosts(() => {
            document.getElementById("list-posts").innerHTML = ""
            document.getElementById("body-post").value = ""
        })
        controlInputListener.subscribeVerifyPlayingGame(() => {
            return controlMain.getState().users[userCode].playingGame
        })
        controlInputListener.initialComponents()
        controlRendererGame.registerUser({ code: userCode })
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

    socket.on("user-start-game", (command) => {
        controlMain.userStartGame(command)
        controlModelView.userStartGame(command)
        if (command.code == userCode) {
            controlRendererGame.registerState(controlMain.getStateGame())
            controlRendererGame.start()
        }
    })

    socket.on("user-quit-game", (command) => {
        controlMain.userQuitGame(command)
        controlModelView.userQuitGame(command)
        if (command.code == userCode) {
            controlRendererGame.quit()
        }
    })

    socket.on("user-send-post", (command) => {
        if (command.chatCode != controlMain.getState().users[userCode].serverConnected &&
            (controlMain.getState().users[userCode].serverConnected != null || command.chatCode != chatCode)) { return }

        controlMain.createPost(command)
        controlModelView.addPost(command)
    })
})
