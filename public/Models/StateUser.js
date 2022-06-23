import ControlState from "./ControlState.js"

export default function StateUser() {
    const stateUser = ControlState()

    const createUser = (command) => {
        stateUser.createUser(command)
    }

    const removeUser = (command) => {
        stateUser.removeUser(command)
    }

    const renameUser = (command) => {
        stateUser.renameUser(command)
    }

    const userEnterServer = (command) => {
        stateUser.userEnterServer(command)
    }

    return {
        users: stateUser.state.users,
        createUser,
        removeUser,
        renameUser,
        userEnterServer,
    }
}
