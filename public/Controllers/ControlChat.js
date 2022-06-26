import StateChat from "../Models/StateChat.js"
import GeneratedCode from "./../Controllers/GeneratedCode.js"

export default function ControlChat() {
    const controlStateChat = StateChat()

    const crateChat = (command, chats = {}) => {
        const code = command.code ? command.code : GeneratedCode(chats).code
        const chat = {
            code: code,
            posts: {}
        }

        controlStateChat.createChat(chat)
    }

    const getChats = () => {
        return controlStateChat.chats
    }

    return {
        crateChat,
        getChats
    }
}
