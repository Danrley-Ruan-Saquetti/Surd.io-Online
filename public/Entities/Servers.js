import generatedId from "../GeneratedId.js"

const generateId = generatedId

export default function createControllerServers() {
    const servers = {}

    const createServer = (command) => {
        command.id = generateId(servers).id
        servers[command.id] = {
            id: command.id,
            name: command.name
        }
    }
    const removeServer = (command) => {
        delete servers[command.id]
    }

    return {
        servers,
        createServer,
        removeServer
    }
}
