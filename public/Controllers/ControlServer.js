import StateServer from "../Models/StateServer.js"
import GeneratedCode from "./GeneratedCode.js"

export default function ControlServer() {
    const controlStateServer = StateServer()

    const createServer = (command) => {
        const code = command.code ? command.code : GeneratedCode(controlStateServer.servers).code
        const server = {
            code: code,
            initial: command.initial,
            name: command.name ? command.name : `Server ${command.initial}`,
            playersConnected: 0,
        }

        controlStateServer.createServer(server)

        return { code }
    }

    const addPlayer = (command) => {
        controlStateServer.addPlayer(command)
    }

    const removePlayer = (command) => {
        controlStateServer.removePlayer(command)
    }

    const getServers = () => {
        return controlStateServer.servers
    }

    return {
        createServer,
        getServers,
        addPlayer,
        removePlayer,
    }
}
