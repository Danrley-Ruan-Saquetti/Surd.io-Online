import createControllerLobby from "./Entities/Lobby.js"
import createControllerInputListener from "./InputListener.js"

const socket = io()

const lobby = createControllerLobby()

const nameTag = document.getElementById("name-tag")

let userId

const list = {
    ui: () => {
        const tagMain = nameTag
        tagMain.value = lobby.state.users[userId].name
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
            option.value = server.id

            tagMain.appendChild(option)
        })
    }
}

socket.on("connect", () => {
    userId = socket.id

    const inputListener = createControllerInputListener(userId)

    inputListener.registerObserver((command) => {
        socket.emit(command.type, command)
    })

    socket.on("setup", (command) => {
        lobby.state = command.state
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
        lobby.state.users[command.userId].name = command.name
        list.users()
    })
})

window.onload = () => {
    nameTag.addEventListener("focusout", () => {
        if (String(nameTag.value) == "") {
            nameTag.value = lobby.state.users[userId].name
        }
    })
}
