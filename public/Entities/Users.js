export default function createControllerUsers() {
    const users = {}

    const createUser = (command) => {
        users[command.userId] = {
            id: command.userId,
            name: `User_${command.userId.substr(0, 5)}`,
            serverConnected: null,
            playingGame: false
        }
    }

    const removeUser = (command) => {
        delete users[command.userId]
    }

    const renameUser = (command) => {
        users[command.userId].name = command.name
    }

    return {
        users,
        createUser,
        removeUser,
        renameUser
    }
}
