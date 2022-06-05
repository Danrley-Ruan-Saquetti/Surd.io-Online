export default class Lobby {
    constructor() {
        this.users = {}
    }

    addUser(command) {
        this.users[command.user.code] = command.user
    }

    removeUser(command) {
        delete this.users[command.code]
    }

    getState() {
        return {
            users: this.users
        }
    }
}
