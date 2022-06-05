import User from "../Entities/User.js"

export default class controlUser {
    constructor() {}

    createUser(command, users) {
        return new User(command, users)
    }

    renameUser(command) {
        command.user.name = command.newName
    }
}
