import createGeneratedCodigo from "../GeneratedCodigo.js"
import createUsers from "./Users.js"

export default function createLobby() {
    const userEM = createUsers()

    const observers = []

    const subscribeObserver = (observerFunction) => {
        observers.push(observerFunction)
    }

    const notifyAll = (command) => {
        observers.forEach((observerFunction) => {
            observerFunction(command)
        })
    }

    const state = {
        lobbyCodigo: createGeneratedCodigo({}).codigo,
        users: userEM.users
    }

    const setup = (command) => {
        Object.keys(command.state.users).map((i) => {
            user.createUser(command.state.users[i])
        })
    }

    const user = {
        createUser: (command) => {
            const codigo = userEM.controller.createUser(command).codigo
            notifyAll({ type: "add-user", codigo, id: command.id })

            return { codigo }
        },
        removeUser: (command) => {
            userEM.controller.removeUser(command)
            notifyAll({ type: "remove-user", codigo: command.codigo })
        },
        renameUser: (command) => {
            userEM.controller.renameUser(command)
            notifyAll({ type: "rename-user", codigo: command.codigo, name: command.name })
        }
    }

    return {
        state,
        setup,
        user,
        subscribeObserver
    }
}
