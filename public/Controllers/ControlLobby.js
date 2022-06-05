import Lobby from "../Entities/Lobby.js"

export default class ControlLobby {
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

    changeServerUser(command) {
        this.lobby.users[command.user.code].serverConnected = command.serverInitial
    }

    addServer(command) {
        this.lobby.addServer({ server: command.server })
    }

    removeServer(command) {
        this.lobby.removeServer(command)
    }

    getState() {
        return this.lobby.getState()
    }
}
