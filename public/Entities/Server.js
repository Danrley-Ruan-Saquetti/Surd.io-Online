import generatedCode from "../Controllers/GeneratedCode.js"

export default class Server {
    constructor(command, servers) {
        const code = command.code ? command.code : generatedCode(servers).code
        const name = `Server_${command.initial}`

        this.code = code
        this.name = name
        this.game = {}
    }
}
