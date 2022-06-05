import Server from "../Entities/Server.js"

export default class ControlServer {
    constructor() {}

    createServer(command, servers) {
        return new Server(command, servers)
    }
}
