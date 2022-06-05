import generatedCode from "../Controllers/GeneratedCode.js"

export default class Server {
    constructor(command, servers) {
        const code = command.code ? command.code : generatedCode(servers).code
        const initial = command.initial
        const name = command.name ? command.name : `Server ${command.initial}`
        const game = command.game ? command.game : {}

        this.code = code
        this.initial = initial
        this.name = name
        this.game = game
    }
}
