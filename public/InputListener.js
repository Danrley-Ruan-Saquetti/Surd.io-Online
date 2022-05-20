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

    function renameUser() {
        notifyAll({ type: "rename-user", userId, name: String(document.getElementById("name-tag").value) })
    }

    return {
        registerObserver
    }
}
