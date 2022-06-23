export default function ControlState() {
    const state = {
        users: {}
    }

    //User
    const createUser = (command) => {
        state.users[command.code] = command
    }

    const removeUser = (command) => {
        delete state.users[command.code]
    }

    const renameUser = (command) => {
        state.users[command.code].name = command.newName
    }

    const changeServer = (command) => {
        state.users[command.code].serveConnected = command.newServer
    }

    return {
        state,
        createUser,
        removeUser,
        renameUser,
        changeServer,
    }
}
