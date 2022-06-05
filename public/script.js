import controlMain from "./Controllers/ControlMain.js"

const socket = io()

const main = new controlMain()

let userCode

const tags = {
    nameTag: document.getElementById("name-tag"),
    listUsers: document.getElementById("list-users"),
    listServers: document.getElementById("list-servers"),
    listPosts: document.getElementById("list-posts"),
}



const list = {
    ui: () => {
        tags.nameTag.value = main.CLobby.getState().users[userCode].name
    },
    users: () => {
        const users = main.getState().users
        tags.listUsers.innerHTML = ""

        CONTROL_lIST.addElement(tags.listUsers, { spanBody: main.CLobby.getState().users[userCode].name, code: main.CLobby.getState().users[userCode].code })

        Object.keys(users).map((u) => {
            if (users[u].code == userCode) { return }

            const user = users[u]

            CONTROL_lIST.addElement(tags.listUsers, { spanBody: user.name, code: user.code })
        })
    },
    addUser: (command) => {
        CONTROL_lIST.addElement(tags.listUsers, { spanBody: main.getState().users[command.code].name, code: command.code })
    },
    removeUser: (code) => {
        CONTROL_lIST.removeElement(code)
    },
    updateUser: (user) => {
        updateElement("listUsers", { user })
    },
    servers: () => {

    }
}

const CONTROL_lIST = {
    addElement: (element, command) => {
        const div = document.createElement("div")
        const p = document.createElement("p")
        const span = document.createElement("span")

        span.innerHTML = command.spanBody

        div.id = command.code

        p.appendChild(span)
        div.appendChild(p)
        element.appendChild(div)
    },
    removeElement: (id) => {
        const element = document.getElementById(id)
        if (!element) { return }

        element.remove()
    },
    updateElement: (element, command) => {
        const tag = tags["listUsers"]
        if (!tag) { return }

        tag.childNodes.forEach((c) => {
            if (c.id == command.code) {
                return
            }
        })
    }
}


socket.on("connect", () => {
    socket.on("setup", (command) => {
        userCode = command.code
        main.setup(command.state)
        list.ui()
        list.users()
    })

    socket.on("user-connected", (command) => {
        if (userCode == command.code) { return }
        const code = main.createUser(command).code
        list.addUser(command)
    })

    socket.on("user-disconnected", (command) => {
        main.removeUser(command)
        list.removeUser(command.code)
    })
})

window.onload = () => {}
