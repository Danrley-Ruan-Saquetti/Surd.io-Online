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

    const userStartGame = (command) => {
        users[command.code].serverConnected = command.serverCode
        users[command.code].playingGame = true
    }

    const userQuitGame = (command) => {
        users[command.code].serverConnected = null
        users[command.code].playingGame = false
    }

    return {
        users,
        createUser,
        removeUser,
        renameUser,
        userStartGame,
        userQuitGame,
    }
}
