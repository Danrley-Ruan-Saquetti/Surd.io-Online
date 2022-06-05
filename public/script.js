import ControlInputListener from "./Controllers/ControlInputListener.js"
import ControlMain from "./Controllers/ControlMain.js"

const socket = io()

const main = new ControlMain()
const controlInputListener = new ControlInputListener(main)

let userCode

const tags = {
    nameTag: document.getElementById("name-tag"),
    listUsers: document.getElementById("list-users"),
    listServers: document.getElementById("list-servers"),
    listPosts: document.getElementById("list-posts"),
}

const list = {
    ui: () => {
        tags.nameTag.value = main.getState().users[userCode].name
    },
    users: () => {
        const users = main.getState().users
        tags.listUsers.innerHTML = ""

        CONTROL_lIST.addElement(tags.listUsers, { spanBody: main.getState().users[userCode].name, code: main.getState().users[userCode].code, prefix: "user", sufixo: "name" })

        Object.keys(users).map((u) => {
            if (users[u].code == userCode) { return }

            const user = users[u]

            CONTROL_lIST.addElement(tags.listUsers, { spanBody: user.name, code: user.code, prefix: "user", sufixo: "name" })
        })
    },
    addUser: (command) => {
        CONTROL_lIST.addElement(tags.listUsers, { spanBody: main.getState().users[command.code].name, code: command.code, prefix: "user", sufixo: "name" })
    },
    removeUser: (command) => {
        CONTROL_lIST.removeElement("user-" + command.code)
    },
    updateUser: (command) => {
        CONTROL_lIST.updateElement(`user-name-${command.user.code}`, { txtUpdate: command.user.name })
    },
    servers: () => {
        tags.listServers.innerHTML = ""

        Object.keys(main.getState().servers).map((s) => {
            const server = main.getState().servers[s]

            const option = document.createElement("option")

            option.innerHTML = server.name
            option.value = `server-${server.initial}`

            tags.listServers.appendChild(option)
        })
    }
}

const CONTROL_lIST = {
    addElement: (element, command) => {
        const div = document.createElement("div")
        const p = document.createElement("p")
        const span = document.createElement("span")

        span.innerHTML = command.spanBody
        span.id = `${command.prefix}-${command.sufixo}-${command.code}`

        div.id = `${command.prefix}-${command.code}`

        p.appendChild(span)
        div.appendChild(p)
        element.appendChild(div)
    },
    removeElement: (id) => {
        const element = document.getElementById(id)
        if (!element) { return }

        element.remove()
    },
    updateElement: (id, command) => {
        const element = document.getElementById(id)
        if (!element) { return }

        element.innerHTML = command.txtUpdate
    }
}

socket.on("connect", () => {
    socket.on("setup", (command) => {
        userCode = command.code
        main.setup(command.state)
        list.ui()
        list.users()
        list.servers()

        controlInputListener.registerUser(main.getState().users[userCode])
        controlInputListener.registerObserver((command) => {
            socket.emit(command.type, command)
        })
    })

    socket.on("user-connected", (command) => {
        if (userCode == command.code) { return }
        const code = main.createUser(command).code
        list.addUser(command)
    })

    socket.on("user-disconnected", (command) => {
        main.removeUser(command)
        list.removeUser({ code: command.code })
    })

    socket.on("user-rename", (command) => {
        main.renameUser(command)
        list.updateUser({ user: command.user })
    })
})

window.onload = () => {}
