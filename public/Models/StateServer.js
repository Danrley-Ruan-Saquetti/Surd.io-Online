export default function StateServer() {
    const servers = {}

    const createServer = (command) => {
        servers[command.code] = command
    }

    return {
        servers,
        createServer,
    }
}
