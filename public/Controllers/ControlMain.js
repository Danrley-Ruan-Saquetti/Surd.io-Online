import controlLobby from "./ControlLobby.js"
import controlUser from "./ControlUser.js"

export default class controlMain {
    constructor() {
        this.CLobby = new controlLobby()
        this.CUser = new controlUser()
    }

    createUser(command) {
        const user = this.CUser.createUser(command, this.getState().users)
        this.CLobby.addUser({ user })

        return { code: user.code }
    }

    removeUser(command) {
        this.CLobby.removeUser(command)
    }

    renameUser(command) {
        this.CUser.renameUser(command)
    }

    getState() {
        return this.CLobby.getState()
    }

    setup(command) {
        Object.keys(command.users).map((u) => {
            this.createUser(command.users[u])
        })
    }
}
