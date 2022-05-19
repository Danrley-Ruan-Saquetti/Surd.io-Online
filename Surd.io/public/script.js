import createLobby from "./Entities/Lobby.js";
import createInputListener from "./InputListener.js";

const lobby = createLobby()
const inputListener = createInputListener(lobby)

const LIST = {
    servers: () => {
        const tagMain = document.getElementById("list-servers")
        tagMain.innerHTML = ""

        Object.keys(lobby.state.servers).map((i) => {
            const server = lobby.state.servers[i]

            const divMain = document.createElement("div")
            const p = document.createElement("p")

            divMain.className = "servers"
            divMain.id = server.id

            p.innerHTML = server.name

            divMain.appendChild(p)
            tagMain.appendChild(divMain)

            inputListener.registerEventServer({ serverId: divMain.id })
        })
    }
}

const generatedId = (command) => {
    const ID_LENGTH = 20
    const lettersDownCase = "abcdefghijklmnopqrstuvwxyz"
    const LETERS = lettersDownCase + lettersDownCase.toUpperCase()

    const validId = (id) => {
        Object.keys(command.type).map((i) => {
            if (command.type[i].id == id) {
                return false
            }
        })

        return true
    }

    let id = ""

    do {
        for (let i = 0; i < ID_LENGTH; i++) {
            id += LETERS[Math.round(Math.random() * (LETERS.length - 1))]
        }
    } while (!validId(id));

    return { id }
}

const userId = generatedId({ type: lobby.state.users }).id
const serverId = generatedId({ type: lobby.state.servers }).id

lobby.users.createuser({ id: userId })
lobby.users.createuser({ id: generatedId({ type: lobby.state.users }).id })
lobby.users.createuser({ id: generatedId({ type: lobby.state.users }).id })
lobby.users.createuser({ id: generatedId({ type: lobby.state.users }).id })
lobby.users.createuser({ id: generatedId({ type: lobby.state.users }).id })

lobby.servers.createServer({
    id: serverId,
    name: "Servidor A"
})
lobby.servers.createServer({
    id: generatedId({
        type: lobby.state.servers
    }).id,
    name: "Servidor B"
})
lobby.servers.createServer({
    id: generatedId({
        type: lobby.state.servers
    }).id,
    name: "Servidor C"
})
lobby.servers.createServer({
    id: generatedId({
        type: lobby.state.servers
    }).id,
    name: "Servidor D"
})
lobby.servers.createServer({
    id: generatedId({
        type: lobby.state.servers
    }).id,
    name: "Servidor E"
})

lobby.users.changeServer({ userId: userId, serverId: serverId })


LIST.servers()

console.log(lobby.state);