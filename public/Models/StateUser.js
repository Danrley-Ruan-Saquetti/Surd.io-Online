export default function StateUser() {
    const users = {}

    const createUser = (command) => {
        users[command.code] = command
    }

    const removeUser = (command) => {
        delete users[command.code]
    }

    const renameUser = (command) => {
        users[command.code].name = command.newName
    }

    const userEnterServer = (command) => {
        users[command.code].serveConnected = command.newServer
    }

    return {
        users,
        createUser,
        removeUser,
        renameUser,
        userEnterServer,
    }
}
