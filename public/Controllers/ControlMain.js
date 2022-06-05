import ControlLobby from "./ControlLobby.js"
import ControlServer from "./ControlServer.js"
import ControlUser from "./ControlUser.js"

export default class ControlMain {
    constructor() {
        this.controlLobby = new ControlLobby()
        this.controlUser = new ControlUser()
        this.controlServer = new ControlServer()
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

    createServer(command) {
        const server = this.controlServer.createServer(command, this.getState().servers)
        this.controlLobby.addServer({ server })

        return { code: server.code }
    }

    removeServer(command) {
        this.controlLobby.removeServer(command)
    }

    getState() {
        return this.controlLobby.getState()
    }

    setup(command) {
        Object.keys(command.users).map((u) => {
            this.createUser(command.users[u])
        })
        Object.keys(command.servers).map((s) => {
            this.createServer(command.servers[s])
        })
    }
}
