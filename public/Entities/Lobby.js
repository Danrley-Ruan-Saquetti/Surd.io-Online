import createControllerChat from "./Chats.js"
import createControllerServers from "./Servers.js"
import createControllerUsers from "./Users.js"

export default function createControllerLobby() {
    const serversM = createControllerServers()
    const usersM = createControllerUsers()
    const chatsM = createControllerChat()

    const state = {
        servers: serversM.servers,
        users: usersM.users,
        chats: chatsM.state
    }

    return {
        state,
        users: {
            createUser: usersM.createUser,
            removeUser: usersM.removeUser,
            renameUser: usersM.renameUser
        },
        servers: {
            createServer: serversM.createServer,
            removeServer: serversM.removeServer
        },
        chats: {
            createChat: chatsM.createChat,
            removeChat: chatsM.removeChat,
        }
    }
}
