import ControlChat from "./ControlChat.js"
import ControlGame from "./ControlGame.js"
import ControlPost from "./ControlPost.js"
import ControlServer from "./ControlServer.js"
import ControlUser from "./ControlUser.js"

export default function ControlMain() {
    const controlUser = ControlUser()
    const controlServer = ControlServer()
    const controlChat = ControlChat()
    const controlPost = ControlPost()
    const controlGame = ControlGame()

    const observers = []

    const subscribeObserver = (command) => {
        observers.push(command)
        controlGame.subscribeObserver(command)
    }

    const notifyAll = (type, command) => {
        observers.forEach((observerFunction) => {
            observerFunction(type, command)
        })
    }

    const setup = (command) => {
        Object.keys(command.users).map((i) => {
            createUser(command.users[i], true)
        })
        Object.keys(command.servers).map((i) => {
            createServer(command.servers[i])
        })
        Object.keys(command.chats).map((i) => {
            createChat(command.chats[i])
        })
        Object.keys(command.games).map((i) => {
            createGame(command.games[i])
        })
        Object.keys(command.players).map((i) => {
            createPlayer(command.players[i])
        })
    }

    // User
    const createUser = (command, setup = false) => {
        const user = controlUser.createUser(command)

        if (!setup) {
            command.code = user.code
            notifyAll("user-connected", command)
        }

        return { code: user.code }
    }

    const removeUser = (command) => {
        notifyAll("user-disconnected", command)
        if (controlUser.getUsers()[command.code].playingGame) { removePlayer({ serverCode: controlUser.getUsers()[command.code].serverConnected }) }

        controlUser.removeUser(command)
    }

    const renameUser = (command) => {
        notifyAll("user-rename", command)
        controlUser.renameUser(command)
    }

    const getContUsers = () => {
        return controlUser.getContUsers()
    }

    // Server
    const createServer = (command) => {
        const server = controlServer.createServer(command)
        return { code: server.code }
    }

    const addPlayerServer = (command) => {
        controlServer.addPlayer(command)
    }

    const removePlayerServer = (command) => {
        controlServer.removePlayer(command)
    }

    // Chat
    const createChat = (command) => {
        controlChat.crateChat(command)
    }

    // Post
    const createPost = (command, setup = false) => {
        const post = controlPost.createPost(command)

        if (!setup) {
            command.code = post.code
            notifyAll("user-send-post", command)
        }
    }

    const getPostsChat = (command) => {
        const posts = controlPost.getPosts()
        const postsChat = {}
        Object.keys(posts).map((i) => {
            if (posts.chatCode != command.chatCode) { return }
            postsChat[posts[i].code] = posts[i].code
        })
    }

    // Games
    const createGame = (command) => {
        controlGame.createGame(command)
    }

    const createPlayer = (command) => {
        const player = controlGame.createPlayer(command)
        addPlayerServer(command)

        return player
    }

    const removePlayer = (command) => {
        controlGame.removePlayer(command)
        removePlayerServer(command)
    }

    const userStartGame = (command) => {
        controlUser.userStartGame(command)
        const player = createPlayer(command)

        notifyAll("user-start-game", player)
    }

    const userQuitGame = (command) => {
        notifyAll("user-quit-game", command)
        controlUser.userQuitGame(command)

        removePlayer(command)
    }


    const acceptKey = (command) => {
        controlGame.acceptKey(command)
    }

    // State
    const getStateGame = () => {
        return {
            map: controlGame.MAP,
            players: controlGame.getPlayers()
        }
    }

    const getState = () => {
        return {
            users: controlUser.getUsers(),
            servers: controlServer.getServers(),
            chats: controlChat.getChats(),
            posts: controlPost.getPosts(),
            games: controlGame.getGames(),
            players: controlGame.getPlayers(),
        }
    }

    return {
        setup,
        subscribeObserver,
        createUser,
        removeUser,
        renameUser,
        getContUsers,
        createServer,
        createChat,
        createGame,
        userStartGame,
        userQuitGame,
        acceptKey,
        createPost,
        getPostsChat,
        getStateGame,
        getState,
    }
}
