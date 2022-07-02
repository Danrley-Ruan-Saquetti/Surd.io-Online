import StateUser from "../Models/StateUser.js"
import GeneratedCode from "./GeneratedCode.js"

export default function ControlUser() {
    const controlStateUser = StateUser()

    const createUser = (command) => {
        const code = command.code ? command.code : GeneratedCode(controlStateUser.users).code
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

    const userStartGame = (command) => {
        controlStateUser.userStartGame(command)
    }

    const userQuitGame = (command) => {
        controlStateUser.userQuitGame(command)
    }

    const getContUsers = () => {
        let _cont = 0

        Object.keys(controlStateUser.users).map(i => _cont++)

        return _cont
    }

    const getUsers = () => {
        return controlStateUser.users
    }

    return {
        createUser,
        removeUser,
        renameUser,
        userStartGame,
        userQuitGame,
        getContUsers,
        getUsers,
    }
}
