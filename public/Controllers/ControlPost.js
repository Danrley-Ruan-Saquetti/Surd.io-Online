import StatePost from "../Models/StatePost.js"
import GeneratedCode from "./GeneratedCode.js"

export default function ControlPost() {
    const controlStatePost = StatePost()

    const createPost = (command, posts = {}) => {
        const code = command.code ? command.code : GeneratedCode(posts).code
        const post = {
            code: code,
            userCode: command.userCode,
            chatCode: command.chatCode,
            body: command.body
        }

        controlStatePost.createPost(post)
    }

    const removePost = (command) => {
        controlStatePost.removePost(command)
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
    }
}
