export default function createControllerServer() {
    const servers = {}

    const createServer = (command) => {
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