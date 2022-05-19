import createControllerLobby from "./Entities/Lobby.js"

const socket = io()

const lobby = createControllerLobby()

let userId

const list = {
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
    servers: () => {}
}

socket.on("connect", () => {
    userId = socket.id

    socket.on("setup", (command) => {
        lobby.state = command.state
        list.users()
    })

    socket.on("user-connected", (command) => {
        lobby.state.users = command.users
        list.users()
    })

    socket.on("user-disconnected", (command) => {
        lobby.state.users = command.users
        list.users()
    })
})
