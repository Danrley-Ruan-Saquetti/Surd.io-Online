import ControlInputListener from "./Controllers/ControlInputListener.js"
import ControlMain from "./Controllers/ControlMain.js"
import ControlModelView from "./Controllers/ControlModelView.js"
import ControlRendererGame from "./Controllers/ControlRendererGame.js"

const socket = io()

let userCode

const ControlAction = () => {
    const controlMain = ControlMain()
    const controlInputListener = ControlInputListener()
    const controlModelView = ControlModelView()
    const controlRendererGame = ControlRendererGame(document.getElementById("canvas"))

    let chatCode

    const setup = (command) => {
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
    }

    const userConnected = (command) => {
        if (socket.id == command.id) { return }
        const code = controlMain.createUser(command).code
        controlModelView.addUser(controlMain.getState().users[code], { contUsers: controlMain.getContUsers() })
    }

    const userDisconnected = (command) => {
        const serverCode = controlMain.getState().users[command.code].playingGame ? controlMain.getState().users[command.code].serverConnected : null
        controlMain.removeUser(command)
        controlModelView.removeUser(command, { contUsers: controlMain.getContUsers() })
        if (serverCode != null) {
            controlModelView.updatePlayersContServer(controlMain.getState().servers[serverCode])
        }
    }

    const userRename = (command) => {
        controlMain.renameUser(command)
        controlModelView.renameUser({ code: command.code, name: command.newName })
    }

    const userStartGame = (command) => {
        controlMain.userStartGame(command)
        controlModelView.userStartGame(command, controlMain.getState().servers[command.serverCode])
        if (command.code == userCode) {
            controlRendererGame.registerState(controlMain.getStateGame())
            controlRendererGame.start()
        }
    }

    const userQuitGame = (command) => {
        controlMain.userQuitGame(command)
        controlModelView.userQuitGame(command, controlMain.getState().servers[command.serverCode])
        if (command.code == userCode) {
            controlRendererGame.quit()
        }
    }

    const userSendPost = (command) => {
        if (command.chatCode != controlMain.getState().users[userCode].serverConnected &&
            (controlMain.getState().users[userCode].serverConnected != null || command.chatCode != chatCode)) { return }

        controlMain.createPost(command)
        controlModelView.addPost(command)
    }

    const setPositionPlayer = (command) => {
        controlMain.setPositionPlayer(command)

        console.log(command);
    }

    return {
        setup,
        userConnected,
        userDisconnected,
        userRename,
        userStartGame,
        userQuitGame,
        userSendPost,
        setPositionPlayer,
    }
}

socket.on("connect", () => {
    const controlAction = ControlAction()

    socket.on("setup", (command) => {
        controlAction.setup(command)
    })

    socket.on("user-connected", (command) => {
        controlAction.userConnected(command)
    })

    socket.on("user-disconnected", (command) => {
        controlAction.userDisconnected(command)
    })

    socket.on("user-rename", (command) => {
        controlAction.userRename(command)
    })

    socket.on("user-start-game", (command) => {
        controlAction.userStartGame(command)
    })

    socket.on("user-quit-game", (command) => {
        controlAction.userQuitGame(command)
    })

    socket.on("user-send-post", (command) => {
        controlAction.userSendPost(command)
    })

    socket.on("player-move", (command) => {
        controlAction.setPositionPlayer(command)
    })
})
