import generatedCode from "./../Controllers/GeneratedCode.js"

export default class User {
    constructor(command, users) {
        const code = command.code ? command.code : generatedCode(users).code
        const name = command.name ? command.name : `Guest_${code.substring(0, 5)}`
        const serverConnected = command.serverConnected ? command.serverConnected : null
        const playingGame = command.playingGame ? command.playingGame : false

        this.id = command.id
        this.code = code
        this.name = name
        this.serverConnected = serverConnected
        this.playingGame = playingGame
    }

    changeServer(command) {
        this.serverConnected = command.serverId
    }
}
