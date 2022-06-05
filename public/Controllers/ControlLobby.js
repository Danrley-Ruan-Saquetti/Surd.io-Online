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

    renameUser(command) {
        this.lobby.users[command.user.code].name = command.newName
    }

    getState() {
        return this.lobby.getState()
    }
}
