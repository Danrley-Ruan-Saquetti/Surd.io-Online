const TAGS = {
    nameTag: document.getElementById("name-tag"),
    listServer: document.getElementById("list-servers"),
    startGame: document.getElementById("start-game"),
    bodyPost: document.getElementById("body-post"),
    sendPost: document.getElementById("send-post"),
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
        TAGS.startGame.addEventListener("click", (ev) => startGame())
        TAGS.nameTag.addEventListener("focusout", (ev) => renameUser())
        document.addEventListener("keydown", (ev) => { if (ev.keyCode == 13) { pressEnter() } })
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
    }

    const userEnterServer = () => {

    }

    const pressEnter = () => {

    }

    return {
        subscribeObserver,
        registerUser,
        initialComponents,
    }
}
