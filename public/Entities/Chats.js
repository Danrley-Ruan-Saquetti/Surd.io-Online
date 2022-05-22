import generatedId from "../GeneratedCodigo.js"
import createControllerPosts from "./Posts.js"

const generateId = generatedId

export default function createControllerChat() {
    const postsM = createControllerPosts()

    const chats = {}

    const createChat = (command) => {
        command.codigo = generateId(chats).codigo
        chats[command.codigo] = {
            codigo: command.codigo,
            where: command.where,
            posts: postsM.posts
        }
    }

    const removeChat = (command) => {
        delete chats[command.codigo]
    }

    return {
        chats,
        createChat,
        removeChat,
        posts: {
            createPost: postsM.createPost,
        }
    }
}
