import createGeneratedCodigo from "../GeneratedCodigo.js"

const generateCodigo = createGeneratedCodigo

export default function createUsers() {
    const users = {}

    const createUser = (command) => {
        const codigo = command.codigo ? command.codigo : generateCodigo(users).codigo

        users[codigo] = {
            id: command.id,
            codigo: codigo,
            name: `Guest_${codigo.substring(0, 5)}`,
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
        controller: {
            createUser,
            removeUser,
            renameUser
        }
    }
}
