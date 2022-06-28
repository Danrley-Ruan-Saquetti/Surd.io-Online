export default function StatePost() {
    const posts = {}

    const createPost = (command) => {
        posts[command.code] = command
    }

    const removePost = (command) => {
        delete posts[command.code]
    }

    const renameUserPost = (command, postCode) => {
        posts[postCode].username = command.newName
    }

    const getContPosts = (command) => {
        let _cont = 0
        let _postCode = null

        Object.keys(posts).map(i => {
            if (command.chatCode != posts.chatCode) { return }
            _cont++
            if (_postCode == null) { _postCode = posts.code }
        })

        return { cont: _cont, code: _postCode }
    }

    return {
        posts,
        createPost,
        removePost,
        renameUserPost,
        getContPosts,
    }
}
