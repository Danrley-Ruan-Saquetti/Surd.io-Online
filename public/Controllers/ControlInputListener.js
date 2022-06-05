export default class ControlInputListener {
    constructor(main) {
        this.main = main
        this.user = null
        this.initialComponents()
        this.observers = []
    }

    registerObserver(observerFunction) {
        this.observers.push(observerFunction)
    }

    notifyAll(command) {
        this.observers.forEach((observerFunction) => {
            observerFunction(command)
        })
    }

    registerUser(code) {
        this.user = code
    }

    initialComponents() {
        document.getElementById("rename-user").addEventListener("click", (ev) => this.renameUser())
        document.getElementById("name-tag").addEventListener("focusout", (ev) => {
            if (String(document.getElementById("name-tag").value) == "") {
                document.getElementById("name-tag").value = this.user.name
            }
        })
        document.getElementById("start-game").addEventListener("click", (ev) => this.startGame())
    }

    renameUser() {
        const newName = String(document.getElementById("name-tag").value)

        if (newName == this.user.name) { return }
        if (newName == "") {
            alert("Insira um nome pro Usuário!")
            return
        }

        this.notifyAll({ type: "user-rename", newName, user: this.user })
    }

    startGame() {
        const serverSelected = String(document.getElementById("list-servers").value)
        this.changeServer(serverSelected.substring(7))
    }

    changeServer(serverInitial) {
        this.notifyAll({ type: "user-changeServer", serverInitial, user: this.user })
    }
}
