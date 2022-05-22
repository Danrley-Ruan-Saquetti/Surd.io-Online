import createControllerLobby from "./Entities/Lobby.js"
import createControllerInputListener from "./InputListener.js"

const socket = io()

const lobby = createControllerLobby()

const nameTag = document.getElementById("name-tag")
const bodyPost = document.getElementById("body-post")

let userCodigo

const list = {
    ui: () => {
        const tagMain = nameTag
        tagMain.value = lobby.state.users[userCodigo].name
    },
    users: () => {
        const tagMain = document.getElementById("list-users")
        tagMain.innerHTML = ""

        Object.keys(lobby.state.users).map((i) => {
            const user = lobby.state.users[i]

            const div = document.createElement("div")
            const p = document.createElement("p")
            const spanName = document.createElement("span")

            spanName.innerHTML = user.name

            p.appendChild(spanName)
            div.appendChild(p)
            tagMain.appendChild(div)
        })
    },
    servers: () => {
        const tagMain = document.getElementById("list-servers")
        tagMain.innerHTML = ""

        Object.keys(lobby.state.servers).map((i) => {
            const server = lobby.state.servers[i]

            const option = document.createElement("option")

            option.innerHTML = server.name
            option.value = server.codigo

            tagMain.appendChild(option)
        })
    }
}

socket.on("connect", () => {

    socket.on("setup", (command) => {
        lobby.state = command.state
        userCodigo = command.codigo

        const inputListener = createControllerInputListener(userCodigo, lobby.state)
        inputListener.registerObserver((command) => {
            socket.emit(command.type, command)
        })
        inputListener.registerUser(lobby.state.users[userCodigo])

        list.users()
        list.servers()
        list.ui()
    })

    socket.on("user-connected", (command) => {
        lobby.state.users = command.users
        list.users()
    })

    socket.on("user-disconnected", (command) => {
        lobby.state.users = command.users
        list.users()
    })

    socket.on("rename-user", (command) => {
        lobby.state.users[command.userCodigo].name = command.name
        list.users()
    })
})

window.onload = () => {
    nameTag.addEventListener("focusout", () => {
        if (String(nameTag.value) == "") {
            nameTag.value = lobby.state.users[userCodigo].name
        }
    })
}
