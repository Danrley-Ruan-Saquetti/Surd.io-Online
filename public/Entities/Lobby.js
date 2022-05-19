import createControllerServers from "./Servers.js"
import createControllerUsers from "./Users.js"

export default function createControllerLobby() {
    const serversM = createControllerServers()
    const usersM = createControllerUsers()

    const state = {
        servers: serversM.servers,
        users: usersM.users,
    }

    return {
        state,
        users: {
            createUser: usersM.createUser,
            removeUser: usersM.removeUser
        },
        servers: {
            createServer: serversM.createServer,
            removeServer: serversM.removeServer
        }
    }
}
