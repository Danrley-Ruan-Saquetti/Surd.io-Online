import User from "../Entities/User.js"

export default class ControlUser {
    constructor() {}

    createUser(command, users) {
        return new User(command, users)
    }

    renameUser(command) {
        command.user.name = command.newName
    }

    changeServer(command) {
        command.user.serverConnected = command.serverInitial
    }
}
