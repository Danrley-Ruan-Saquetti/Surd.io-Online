export default function createControllerInputListener(userId) {
    const observers = []

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
        if (newName != "") {
            notifyAll({ type: "rename-user", userId, name: newName })
        }
    }

    function sendPost() {
        const bodyPost = String(document.getElementById("body-post").value)
        if (bodyPost != "") {
            notifyAll({ type: "send-post", userId, bodyPost: bodyPost, where: "lobby" })
        }
    }

    return {
        registerObserver
    }
}
