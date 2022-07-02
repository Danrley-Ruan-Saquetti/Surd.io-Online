import StatePost from "../Models/StatePost.js"
import GeneratedCode from "./GeneratedCode.js"

export default function ControlPost() {
    const controlStatePost = StatePost()

    const createPost = (command) => {
        const code = command.code ? command.code : GeneratedCode(controlStatePost.posts).code
        const post = {
            code: code,
            userCode: command.userCode,
            username: command.username,
            chatCode: command.chatCode,
            body: command.body,
            type: command.type,
        }

        controlStatePost.createPost(post)

        return { code }
    }

    const removePost = (command) => {
        controlStatePost.removePost(command)
    }

    const renameUser = (command) => {
        Object.keys(controlStatePost.posts).map(i => {
            if (controlStatePost.posts[i].userCode != command.code) { return }
            controlStatePost.renameUserPost(command, controlStatePost.posts[i].code)
        })
    }

    const getContPosts = (command) => {
        return controlStatePost.getContPosts(command)
    }

    const getPosts = () => {
        return controlStatePost.posts
    }

    return {
        getPosts,
        createPost,
        removePost,
        getContPosts,
        renameUser,
    }
}
