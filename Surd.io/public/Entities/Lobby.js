import createControllerServer from "./Servers.js"
import createControllerUser from "./Users.js"

const  CUsers = createControllerUser()
const CServers = createControllerServer()


export default function createLobby() {
    const state = {
        users: CUsers.users,
        servers: CServers.servers
    }

    return {
        state,
        users: {
            createuser: CUsers.createUser,
            removeUser: CUsers.removeUser,
            changeServer: CUsers.changeserver
        },
        servers: {
            createServer: CServers.createServer,
            removeServer: CServers.removeServer,
        }
    }
}