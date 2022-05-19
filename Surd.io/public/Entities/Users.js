export default function createControllerUser() {
    const users = {}

    const createUser = (command) => {
        users[command.id] = {
            id: command.id,
            name: `User_${command.id.substr(0, 5)}`,
            serverConnected: null,
            playingGame: false
        }
    }

    const changeserver = (command) => {
        users[command.userId].serverConnected = command.serverId
    }

    const removeUser = (command) => {
        delete users[command.id]
    }

    return {
        users,
        createUser,
        removeUser,
        changeserver
    }
}