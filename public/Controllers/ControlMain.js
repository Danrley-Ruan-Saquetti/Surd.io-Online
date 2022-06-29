import ControlChat from "./ControlChat.js"
import ControlPost from "./ControlPost.js"
import ControlServer from "./ControlServer.js"
import ControlUser from "./ControlUser.js"

export default function ControlMain() {
    const controlUser = ControlUser()
    const controlServer = ControlServer()
    const controlChat = ControlChat()
    const controlPost = ControlPost()

    const observers = []

    const subscribeObserver = (command) => {
        observers.push(command)
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
    }

    // User
    const createUser = (command, setup = false) => {
        const user = controlUser.createUser(command, controlUser.getUsers())

        if (!setup) {
            command.code = user.code
            notifyAll("user-connected", command)
        }

        return { code: user.code }
    }

    const removeUser = (command) => {
        notifyAll("user-disconnected", command)
        controlUser.removeUser(command)
    }

    const renameUser = (command) => {
        notifyAll("user-rename", command)
        controlUser.renameUser(command)
    }

    const userStartGame = (command) => {
        notifyAll("user-start-game", command)
        controlUser.userStartGame(command)
    }

    const userQuitGame = (command) => {
        notifyAll("user-quit-game", command)
        controlUser.userQuitGame(command)
    }

    const getContUsers = () => {
        return controlUser.getContUsers()
    }

    // Server
    const createServer = (command) => {
        const server = controlServer.createServer(command, controlServer.getServers())
        return { code: server.code }
    }

    // Chat
    const createChat = (command) => {
        controlChat.crateChat(command, controlChat.getChats())
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

    const getState = () => {
        return {
            users: controlUser.getUsers(),
            servers: controlServer.getServers(),
            chats: controlChat.getChats(),
            posts: controlPost.getPosts(),
        }
    }

    return {
        getState,
        setup,
        subscribeObserver,
        createUser,
        removeUser,
        renameUser,
        getContUsers,
        userStartGame,
        userQuitGame,
        createServer,
        createChat,
        createPost,
        getPostsChat,
    }
}
