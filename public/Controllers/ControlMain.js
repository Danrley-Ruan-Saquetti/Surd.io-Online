import ControlServer from "./ControlServer.js"
import ControlUser from "./ControlUser.js"

export default function ControlMain() {
    const controlUser = ControlUser()
    const controlServer = ControlServer()

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
        Object.keys(command.servers).map((i) => {
            createServer(command.servers[i])
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

    const userEnterServer = (command) => {
        notifyAll("user-change-server", command)
        controlUser.userEnterServer(command)
    }

    // Server
    const createServer = (command) => {
        controlServer.createServer(command)
    }

    const getState = () => {
        return {
            users: controlUser.getUsers(),
            servers: controlServer.getServers(),
        }
    }

    return {
        getState,
        setup,
        subscribeObserver,
        createUser,
        removeUser,
        renameUser,
        userEnterServer,
        createServer,
    }
}
