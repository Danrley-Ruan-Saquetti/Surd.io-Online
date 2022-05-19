export default function createControllerUsers() {
    const users = {}

    const createUser = (command) => {
        users[command.id] = {
            id: command.id,
            name: `User_${command.id.substr(0, 5)}`,
            serverConnected: null,
            playingGame: false
        }
    }
    const removeUser = (command) => {
        delete users[command.id]
    }

    return {
        users,
        createUser,
        removeUser
    }
}
