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

    const userEnterGame = (command) => {
        users[command.code].serverConnected = command.serverCode
        users[command.code].playingGame = true
    }

    return {
        users,
        createUser,
        removeUser,
        renameUser,
        userEnterGame,
    }
}
