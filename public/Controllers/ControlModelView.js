const TAGS = {
    nameTag: document.getElementById("name-tag"),
    listUsers: document.getElementById("list-users"),
    listServers: document.getElementById("list-servers"),
    listPosts: document.getElementById("list-posts"),
}

export default function ControlModelView() {
    const user = { code: null }

    const subscribeUser = (command) => {
        user.code = command.code
    }

    // User
    const userTag = (command) => {
        TAGS.nameTag.value = command.name
    }

    const addUserList = (command) => {
        const divMain = document.createElement("div")
        const p = document.createElement("p")
        const spanName = document.createElement("span")

        spanName.innerHTML = command.name
        divMain.id = `user-${command.code}`
        if (command.code == user.code) { divMain.id += ` this-user` }
        divMain.className = `users`
        spanName.id = `username-${command.code}`

        p.append(spanName)
        divMain.appendChild(p)
        TAGS.listUsers.appendChild(divMain)
    }

    const userList = (command) => {
        TAGS.listUsers.innerHTML = ""
        Object.keys(command.users).map((i) => {
            const user = command.users[i]
            addUserList(user)
        })
    }

    const addUser = (command) => {
        addUserList(command)
    }

    const removeUser = (command) => {
        const tag = document.getElementById(`user-${command.code}`)
        tag.remove()
    }

    const renameUser = (command) => {
        const tag = document.getElementById(`username-${command.code}`)
        tag.innerHTML = command.name
    }

    return {
        subscribeUser,
        userTag,
        userList,
        addUser,
        removeUser,
        renameUser,
    }
}
