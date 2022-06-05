import Lobby from "../Entities/Lobby.js"

export default class controlLobby {
    constructor() {
        this.lobby = new Lobby()
    }

    addUser(command) {
        this.lobby.addUser({ user: command.user })
    }

    removeUser(command) {
        this.lobby.removeUser(command)
    }

    getState() {
        return this.lobby.getState()
    }
}
