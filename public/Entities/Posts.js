export default function createControllerPosts() {
    const posts = {}

    const createPost = (command) => {
        posts[command.postId] = {
            id: command.postId,
            userId: command.userId,
            body: command.body
        }
    }

    const removePost = (command) => {
        delete posts[command.postId]
    }

    return {
        posts,
        createPost,
        removePost
    }
}
