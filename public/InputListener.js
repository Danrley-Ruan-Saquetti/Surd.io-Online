export default function createControllerInputListener(userCodigo, stateM) {
    const observers = []
    const lobby = stateM
    let user

    const registerUser = (userM) => {
        user = userM
    }

    const registerObserver = (observerFunction) => {
        observers.push(observerFunction)
    }

    const notifyAll = (command) => {
        observers.forEach((observerFunction) => {
            observerFunction(command)
        })
    }

    document.getElementById("rename-user").addEventListener("click", (ev) => renameUser())
    document.getElementById("send-post").addEventListener("click", (ev) => sendPost())

    function renameUser() {
        const newName = String(document.getElementById("name-tag").value)
        if (newName != "" && user.name != newName) {
            notifyAll({ type: "rename-user", userCodigo, name: newName })
        }
    }

    function sendPost() {
        const bodyPost = String(document.getElementById("body-post").value)
        if (bodyPost != "") {
            notifyAll({ type: "send-post", id: null, userCodigo, body: bodyPost, where: lobby.lobbyCodigo })
        }
    }

    return {
        registerUser,
        registerObserver
    }
}
