export default function ControlState() {
    const state = {
        users: {},
        servers: {},
    }

    // User
    const createUser = (command) => {
        state.users[command.code] = command
    }

    const removeUser = (command) => {
        delete state.users[command.code]
    }

    const renameUser = (command) => {
        state.users[command.code].name = command.newName
    }

    const userEnterServer = (command) => {
        state.users[command.code].serveConnected = command.newServer
    }

    // Server
    const createServer = (command) => {
        state.servers[command.code] = command
    }

    return {
        state,
        createUser,
        removeUser,
        renameUser,
        userEnterServer,
        createServer,
    }
}
