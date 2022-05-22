import generatedCodigo from "../GeneratedCodigo.js"

const generateCodigo = generatedCodigo

export default function createControllerServers() {
    const servers = {}

    const createServer = (command) => {
        const codigo = generateCodigo(servers).codigo
        servers[codigo] = {
            codigo: codigo,
            name: command.name
        }
    }
    const removeServer = (command) => {
        delete servers[command.codigo]
    }

    return {
        servers,
        createServer,
        removeServer
    }
}
