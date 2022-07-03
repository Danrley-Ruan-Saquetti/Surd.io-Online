export default function StateServer() {
    const servers = {}

    const createServer = (command) => {
        servers[command.code] = command
    }

    const addPlayer = (command) => {
        servers[command.serverCode].playersConnected++
    }

    const removePlayer = (command) => {
        servers[command.serverCode].playersConnected--
    }

    return {
        servers,
        createServer,
        addPlayer,
        removePlayer,
    }
}
