import controlLobby from "./ControlLobby.js"
import controlUser from "./ControlUser.js"

export default class controlMain {
    constructor() {
        this.controlLobby = new controlLobby()
        this.controlUser = new controlUser()
        this.observers = []
    }

    subscribeObserver(observerFunction) {
        this.observers.push(observerFunction)
    }

    notifyAll(command) {
        this.observers.forEach((observerFunction) => {
            observerFunction(command)
        })
    }

    createUser(command) {
        const user = this.controlUser.createUser(command, this.getState().users)
        this.controlLobby.addUser({ user })

        return { code: user.code }
    }

    removeUser(command) {
        this.controlLobby.removeUser(command)
    }

    renameUser(command) {
        this.controlUser.renameUser(command)
        this.controlLobby.renameUser(command)
    }

    getState() {
        return this.controlLobby.getState()
    }

    setup(command) {
        Object.keys(command.users).map((u) => {
            this.createUser(command.users[u])
        })
    }
}
