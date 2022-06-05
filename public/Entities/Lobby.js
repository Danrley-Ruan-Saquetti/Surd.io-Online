export default class Lobby {
    constructor() {
        this.users = {}
        this.servers = {}
    }

    addUser(command) {
        this.users[command.user.code] = command.user
    }

    removeUser(command) {
        delete this.users[command.code]
    }

    addServer(command) {
        this.servers[command.server.initial] = command.server
    }

    removeServer(command) {
        delete this.servers[command.code]
    }

    getState() {
        return {
            users: this.users,
            servers: this.servers
        }
    }
}
