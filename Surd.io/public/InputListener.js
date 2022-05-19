export default function createInputListener(lobbyM) {
    const lobby = lobbyM

    const registerEventServer = (command) => {
        document.getElementById(command.serveId).addEventListener("click", (ev) => {
            console.log(lobby.state.servers[command.serveId])
        })
    }

    return {
        registerEventServer
    }
}