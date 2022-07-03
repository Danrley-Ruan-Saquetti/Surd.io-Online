const TAGS = {
    nameTag: document.getElementById("name-tag"),
    listUsers: document.getElementById("list-users"),
    listServers: document.getElementById("list-servers"),
    listPosts: document.getElementById("list-posts"),
    chatClose: document.getElementById("chat-close"),
    listPostsChatClose: document.getElementById("list-posts-chat-close"),
    contUsers: document.getElementById("cont-users"),
    contentNotifications: document.getElementById("content-notification"),
    notifications: document.getElementById("notifications"),
}

export default function ControlModelView() {
    const user = {
        code: null,
        name: () => { return "" }
    }

    let _contPreviewPosts = 0

    const registerUser = (command) => {
        user.code = command.code
        user.name = command.getName
    }

    const setup = (command) => {
        TAGS.listUsers.innerHTML = ""
        Object.keys(command.users).map((i) => {
            const user = command.users[i]
            addUserList(user)
        })

        TAGS.listServers.innerHTML = ""
        Object.keys(command.servers).map((i) => {
            const server = command.servers[i]
            addServerList(server)
        })

        TAGS.listPosts.innerHTML = ""
        Object.keys(command.posts).map((i) => {
            const post = command.posts[i]
            addPostList(post)
        })
    }

    // User
    const userTag = (command) => {
        TAGS.nameTag.value = command.name
    }

    const addUserList = (command) => {
        const divMain = document.createElement("div")
        const p = document.createElement("p")
        const spanName = document.createElement("span")
        const boxState = document.createElement("div")

        spanName.innerHTML = command.name

        divMain.id = `user-${command.code}`
        if (command.code == user.code) { divMain.id += ` this-user` }
        divMain.className = `users`
        spanName.id = `username-${command.code}`
        boxState.className = `user-state`
        boxState.id = `state-user-${command.code}`
        if (command.playingGame) { boxState.classList.toggle("user-playing") }

        p.append(spanName)
        divMain.appendChild(p)
        divMain.appendChild(boxState)
        TAGS.listUsers.appendChild(divMain)
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
        renameUserPost(command)
    }

    const userStartGame = (command) => {
        const tag = document.getElementById(`state-user-${command.code}`)

        tag.classList.toggle(`user-playing`, true)
    }

    const userQuitGame = (command) => {
        const tag = document.getElementById(`state-user-${command.code}`)

        tag.classList.toggle(`user-playing`, false)
    }

    const setContUsers = (command) => {
        TAGS.contUsers.innerHTML = command.contUsers
    }

    // Server
    const addServerList = (command) => {
        const option = document.createElement("option")
        const spanServerName = document.createElement("span")
        const spanPlayersConnected = document.createElement("span")
        const spanPlayersContInfo = document.createElement("span")
        const spanPlayersCont = document.createElement("span")

        option.value = `server-${command.code}`
        spanServerName.innerHTML = command.name
        spanPlayersContInfo.innerText = ` - Players online `
        spanPlayersCont.innerHTML = command.playersConnected
        spanPlayersCont.id = `players-in-server-${command.code}`

        spanPlayersConnected.appendChild(spanPlayersContInfo)
        spanPlayersConnected.appendChild(spanPlayersCont)
        option.appendChild(spanServerName)
        option.appendChild(spanPlayersConnected)
        TAGS.listServers.appendChild(option)
    }

    const updatePlayersContServer = (command) => {
        const tag = document.getElementById(`players-in-server-${command.code}`)

        tag.innerHTML = command.playersConnected
    }

    // Posts - Lobby
    const addPostList = (command) => {
        const getElement = () => {
            const divMain = document.createElement("div")
            const p = document.createElement("p")
            const spanBody = document.createElement("span")
            const spanUser = document.createElement("span")

            spanBody.innerHTML = command.body
            spanUser.innerHTML = `${command.username}: `

            divMain.id = `post-${command.code}`
            divMain.className = `posts`
            if (command.userCode == user.code) { divMain.classList.toggle(`this-post`) }
            if (command.type == "info") { divMain.classList.toggle(`info`) }
            spanBody.className = `bodies`
            spanUser.className = `post-user-${command.userCode}`

            p.append(spanUser)
            p.append(spanBody)
            divMain.appendChild(p)

            return divMain
        }

        TAGS.listPosts.appendChild(getElement())
        TAGS.listPosts.scrollTop = TAGS.listPosts.scrollHeight

        if (TAGS.chatClose.classList.contains("on")) {
            const divMain = getElement()

            divMain.id = `preview-post-${command.code}`
            divMain.className += ` preview-posts`
            TAGS.listPostsChatClose.appendChild(divMain)

            _contPreviewPosts = TAGS.contentNotifications.classList.contains("on") ? _contPreviewPosts + 1 : 1
            TAGS.notifications.innerHTML = _contPreviewPosts

            TAGS.contentNotifications.classList.toggle("on", true)

            setInterval(() => {
                divMain.remove()
            }, 4000)
        }
    }

    const addPost = (command) => {
        addPostList(command)
    }

    const removePost = (command) => {
        const tag = document.getElementById(`post-${command.code}`)
        tag.remove()
    }

    const renameUserPost = (command) => {
        const tags = document.querySelectorAll(`.post-user-${command.code}`)
        tags.forEach(tag => {
            tag.innerHTML = `${command.name}: `
        })
    }

    return {
        registerUser,
        setup,
        userTag,
        addUser,
        removeUser,
        renameUser,
        userStartGame,
        setContUsers,
        updatePlayersContServer,
        addPost,
        removePost,
        userQuitGame,
    }
}
