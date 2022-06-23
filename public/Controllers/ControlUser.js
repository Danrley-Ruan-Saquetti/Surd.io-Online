import StateUser from "../Models/StateUser.js"
import GeneratedCode from "./GeneratedCode.js"

export default function ControlUser() {
    const controlStateUser = StateUser()

    const createUser = (command, users = {}) => {
        const code = command.code ? command.code : GeneratedCode(users).code
        const user = {
            id: command.id,
            code: code,
            name: command.name ? command.name : `Guest_${code.substring(0, 5)}`,
            serverConnected: command.serverConnected ? command.serverConnected : null,
            playingGame: command.playingGame ? command.playingGame : false,
        }

        controlStateUser.createUser(user)

        return { code }
    }

    const removeUser = (command) => {
        controlStateUser.removeUser(command)
    }

    const renameUser = (command) => {
        controlStateUser.renameUser(command)
    }

    const userEnterServer = (command) => {
        controlStateUser.userEnterServer(command)
    }

    const getUsers = () => {
        return controlStateUser.users
    }

    return {
        createUser,
        removeUser,
        renameUser,
        userEnterServer,
        getUsers,
    }
}
