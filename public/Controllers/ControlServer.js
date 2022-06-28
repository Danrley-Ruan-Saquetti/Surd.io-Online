import StateServer from "../Models/StateServer.js"
import GeneratedCode from "./GeneratedCode.js"

export default function ControlServer() {
    const controlStateServer = StateServer()

    const createServer = (command, servers = {}) => {
        const code = command.code ? command.code : GeneratedCode(servers).code
        const server = {
            code: code,
            initial: command.initial,
            name: command.name ? command.name : `Server ${command.initial}`,
        }

        controlStateServer.createServer(server)

        return { code }
    }

    const getServers = () => {
        return controlStateServer.servers
    }

    return {
        createServer,
        getServers,
    }
}
