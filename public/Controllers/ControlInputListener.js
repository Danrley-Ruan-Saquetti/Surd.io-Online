const TAGS = {
    ui: document.getElementById("ui"),
    rendererGame: document.getElementById("renderer-game"),
    nameTag: document.getElementById("name-tag"),
    listServer: document.getElementById("list-servers"),
    startGame: document.getElementById("start-game"),
    quitGame: document.getElementById("quit-game"),
    bodyPost: document.getElementById("body-post"),
    sendPost: document.getElementById("send-post"),
    chatGame: document.getElementById("chat-game"),
    chatGameOpen: document.getElementById("open-chat"),
    chatGameClose: document.getElementById("close-chat"),
    bodyPostGame: document.getElementById("body-post-game"),
    sendPostGame: document.getElementById("send-post-game"),
}

export default function ControlInputListener() {
    const user = {
        code: null,
        name: () => { return "" }
    }

    const observers = []

    const subscribeObserver = (observerFunction) => {
        observers.push(observerFunction)
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
        TAGS.sendPostGame.addEventListener("click", (ev) => sendPostGame())
        TAGS.startGame.addEventListener("click", (ev) => startGame())
        TAGS.quitGame.addEventListener("click", (ev) => quitGame())
        TAGS.nameTag.addEventListener("focusout", (ev) => renameUser())
        document.addEventListener("keydown", (ev) => keyPress(ev))
    }

    const toggleScreen = () => {
        TAGS.ui.classList.toggle("off")
        TAGS.rendererGame.classList.toggle("on")
    }

    const toggleChat = () => {
        TAGS.chatGame.classList.toggle("active")
        TAGS.chatGameOpen.classList.toggle("off")
        TAGS.chatGameClose.classList.toggle("on")
    }

    const keyPress = (ev) => {
        switch (ev.keyCode) {
            case 13:
                toggleChat()
                break;
        }
    }

    const sendPostGame = () => {
        const body = String(TAGS.bodyPostGame.value)
        if (body == "") { return }

        notifyAll("user-send-post", { body, userCode: user.code })
        TAGS.bodyPostGame.value = ""
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
    }

    const pressEnter = () => {

    }

    return {
        subscribeObserver,
        registerUser,
        initialComponents,
    }
}
