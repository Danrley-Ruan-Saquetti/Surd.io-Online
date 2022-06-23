import ControlState from "./ControlState.js"

export default function StateUser() {
    const stateUser = ControlState()

    //User
    const createUser = (command) => {
        stateUser.createUser(command)
    }

    const removeUser = (command) => {
        stateUser.removeUser(command)
    }

    const renameUser = (command) => {
        stateUser.renameUser(command)
    }

    const changeServer = (command) => {
        stateUser.changeServer(command)
    }

    return {
        users: stateUser.state.users,
        createUser,
        removeUser,
        renameUser,
        changeServer,
    }
}
