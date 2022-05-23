import createLobby from "./Entities/Lobby.js"

const socket = io()

const lobby = createLobby()

let userCodigo

const tags = {
    nameTag: document.getElementById("name-tag"),
    listUsers: document.getElementById("list-users"),
    listServers: document.getElementById("list-servers"),
    listPosts: document.getElementById("list-posts"),
}

const list = {
    ui: () => {
        tags.nameTag.value = lobby.state.users[userCodigo].name
    },
    users: () => {
        tags.listUsers.innerHTML = ""

        Object.keys(lobby.state.users).map((i) => {
            const user = lobby.state.users[i]

            const div = document.createElement("div")
            const p = document.createElement("p")
            const spanName = document.createElement("span")

            spanName.innerHTML = user.name

            spanName.class = "name-users"
            div.id = user.codigo
            div.className = "users"

            p.appendChild(spanName)
            div.appendChild(p)
            tags.listUsers.appendChild(div)
        })
    },
    addUser: (user) => {
        const div = document.createElement("div")
        const p = document.createElement("p")
        const spanName = document.createElement("span")

        spanName.innerHTML = user.name

        spanName.class = "name-users"
        div.id = user.codigo
        div.className = "users"

        p.appendChild(spanName)
        div.appendChild(p)
        tags.listUsers.appendChild(div)
    },
    removeUser: (user) => {
        tags.listUsers.removeChild(document.getElementById(user.codigo))
    },
    servers: () => {}
}

socket.on("connect", () => {
    socket.on("setup", (command) => {
        userCodigo = command.codigo
        lobby.setup(command)
        list.ui()
        list.users()
    })

    socket.on("add-user", (command) => {
        lobby.user.createUser(command)
        list.addUser(lobby.state.users[command.codigo])
    })

    socket.on("remove-user", (command) => {
        list.removeUser(lobby.state.users[command.codigo])
        lobby.user.removeUser(command)
    })
})

window.onload = () => {}
