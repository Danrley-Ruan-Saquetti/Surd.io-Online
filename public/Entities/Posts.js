export default function createControllerPosts() {
    const posts = {}

    const createPost = (command) => {
        posts[command.codigo] = {
            codigo: command.codigo,
            userCodigo: command.userCodigo,
            body: command.body
        }
    }

    return {
        posts,
        createPost
    }
}
