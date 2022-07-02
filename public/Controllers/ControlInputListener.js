const TAGS = {
    ui: document.getElementById("ui"),
    rendererGame: document.getElementById("renderer-game"),
    nameTag: document.getElementById("name-tag"),
    chat: document.getElementById("chat"),
    chatClose: document.getElementById("chat-close"),
    listServer: document.getElementById("list-servers"),
    listPosts: document.getElementById("list-posts"),
    startGame: document.getElementById("start-game"),
    quitGame: document.getElementById("quit-game"),
    bodyPost: document.getElementById("body-post"),
    sendPost: document.getElementById("send-post"),
    listPostsChatClose: document.getElementById("list-posts-chat-close"),
    contentChatClose: document.getElementById("content-chat-close"),
    contentNotifications: document.getElementById("content-notification"),
    notifications: document.getElementById("notifications"),
}

export default function ControlInputListener() {
    const user = {
        code: null,
        name: () => { return "" }
    }

    const observers = []
    let clearListPosts = () => {}
    let verifyPlayingGame = () => { return true }

    const subscribeObserver = (observerFunction) => {
        observers.push(observerFunction)
    }

    const subscribeClearListPosts = (command) => {
        clearListPosts = command
    }

    const subscribeVerifyPlayingGame = (command) => {
        verifyPlayingGame = command
    }

    const notifyAll = (type, command) => {
        observers.forEach((observerFunction) => {
            observerFunction(type, command)
        })
    }

    const registerUser = (command) => {
        user.code = command.code
        user.name = command.getName
    }

    const initialComponents = () => {
        TAGS.sendPost.addEventListener("click", (ev) => sendPost())
        TAGS.startGame.addEventListener("click", (ev) => startGame())
        TAGS.quitGame.addEventListener("click", (ev) => quitGame())
        TAGS.contentChatClose.addEventListener("click", (ev) => toggleChat())
        TAGS.nameTag.addEventListener("focusout", (ev) => renameUser())
        document.addEventListener("keydown", (ev) => keyPress(ev))
    }

    const toggleScreen = () => {
        TAGS.ui.classList.toggle("off")
        TAGS.rendererGame.classList.toggle("on")
        TAGS.chat.classList.toggle("game")

        if (TAGS.ui.classList.contains("off")) {
            TAGS.listPostsChatClose.innerHTML = ""
            TAGS.contentNotifications.classList.toggle("on", false)
        }
        clearListPosts()
    }

    const toggleChat = () => {
        if (verifyPlayingGame()) {
            TAGS.chat.classList.toggle("off")
            TAGS.chatClose.classList.toggle("on")

            if (!TAGS.chat.classList.contains("off")) {
                TAGS.listPostsChatClose.innerHTML = ""
                TAGS.notifications.innerHTML = 0
                TAGS.contentNotifications.classList.toggle("on", false)
                TAGS.listPosts.scrollTop = TAGS.listPosts.scrollHeight
            }
        }
    }

    const keyPress = (ev) => {
        switch (ev.keyCode) {
            case 13:
                toggleChat()
                break;
        }
    }

    const sendPost = () => {
        const body = String(TAGS.bodyPost.value)
        if (body == "") { return }

        notifyAll("user-send-post", { body, userCode: user.code })
        TAGS.bodyPost.value = ""
    }

    const renameUser = () => {
        const newName = String(TAGS.nameTag.value)
        if (newName == "") {
            TAGS.nameTag.value = user.name()
            return
        }

        if (newName == user.name()) { return }

        notifyAll("user-rename", { code: user.code, newName })
    }

    const startGame = () => {
        const server = String(TAGS.listServer.value).substring(7)
        notifyAll("user-start-game", { serverCode: server, code: user.code })
        toggleScreen()
    }

    const quitGame = () => {
        const server = String(TAGS.listServer.value).substring(7)
        notifyAll("user-quit-game", { serverCode: server, code: user.code })
        toggleScreen()
        if (verifyPlayingGame()) {
            TAGS.chat.classList.toggle("off", false)
            TAGS.chatClose.classList.toggle("on", false)
        }
    }

    return {
        subscribeObserver,
        registerUser,
        initialComponents,
        subscribeClearListPosts,
        subscribeVerifyPlayingGame,
    }
}
