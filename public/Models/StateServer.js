import ControlState from "./ControlState.js"

export default function StateServer() {
    const stateServer = ControlState()

    const createServer = (command) => {
        stateServer.createServer(command)
    }

    return {
        servers: stateServer.state.servers,
        createServer,
    }
}
