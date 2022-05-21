import generatedId from "../GeneratedId.js"
import createControllerPosts from "./Posts.js"

const generateId = generatedId

export default function createControllerChat() {
    const postsM = createControllerPosts()

    const chats = {}

    const createChat = (command) => {
        command.id = generateId(chats).id
        console.log(command);
        chats[command.id] = {
            id: command.id,
            where: command.where,
            posts: {}
        }
        console.log(chats);
    }

    const removeChat = (command) => {
        delete chats[command.id]
    }

    return {
        chats,
        createChat,
        removeChat,
        posts: {
            createPost: postsM.createPost,
            removePost: postsM.removePost,
        }
    }
}
