export default function StateChat() {
    const chats = {}

    const createChat = (command) => {
        chats[command.code] = command
    }

    return {
        chats,
        createChat,
    }
}
