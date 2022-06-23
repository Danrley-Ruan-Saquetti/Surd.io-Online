import ControlUser from "./ControlUser.js"

export default function ControlMain() {
    const controlUser = ControlUser()

    const observers = []

    const subscribeObserver = (command) => {
        observers.push(command)
    }

    const notifyAll = (type, command) => {
        observers.forEach((observerFunction) => {
            observerFunction(type, command)
        })
    }

    const setup = (command) => {
        Object.keys(command.users).map((i) => {
            createUser(command.users[i], true)
        })
    }

    // User
    const createUser = (command, setup = false) => {
        const user = controlUser.createUser(command, controlUser.getUsers().users)

        if (!setup) {
            command.code = user.code
            notifyAll("user-connected", command)
        }

        return { code: user.code }
    }

    const removeUser = (command) => {
        notifyAll("user-disconnected", command)
        controlUser.removeUser(command)
    }

    const renameUser = (command) => {
        notifyAll("user-rename", command)
        controlUser.renameUser(command)
    }

    const changeServerUser = (command) => {
        notifyAll("user-change-server", command)
        controlUser.changeServer(command)
    }

    const getState = () => {
        return {
            users: controlUser.getUsers(),
        }
    }

    return {
        getState,
        setup,
        subscribeObserver,
        createUser,
        removeUser,
        renameUser,
        changeServerUser,
    }
}
