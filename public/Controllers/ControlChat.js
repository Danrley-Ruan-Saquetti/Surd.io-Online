import StateChat from "../Models/StateChat.js"
import GeneratedCode from "./../Controllers/GeneratedCode.js"

export default function ControlChat() {
    const controlStateChat = StateChat()

    const crateChat = (command) => {
        const code = command.code ? command.code : GeneratedCode(controlStateChat.chats).code
        const chat = {
            code: code,
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
