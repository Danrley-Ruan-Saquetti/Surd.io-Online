import generatedCodigo from "../GeneratedCodigo.js"

const generateCodigo = generatedCodigo

export default function createControllerUsers() {
    const users = {}

    const createUser = (command) => {
        const codigo = generateCodigo(users).codigo
        users[codigo] = {
            id: command.id,
            codigo: codigo,
            name: `User_${codigo.substring(0, 5)}`,
            serverConnected: null,
            playingGame: false
        }

        return { codigo }
    }

    const removeUser = (command) => {
        delete users[command.codigo]
    }

    const renameUser = (command) => {
        users[command.codigo].name = command.name
    }

    return {
        users,
        createUser,
        removeUser,
        renameUser
    }
}
