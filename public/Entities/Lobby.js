import createControllerUsers from "./Users.js"

export default function createControllerLobby() {
    const usersM = createControllerUsers()

    const state = {
        users: usersM.users
    }

    return {
        state,
        users: {
            createUser: usersM.createUser,
            removeUser: usersM.removeUser
        }
    }
}
