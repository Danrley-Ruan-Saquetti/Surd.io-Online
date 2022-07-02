export default function StateGame() {
    const games = {}

    const createGame = (command) => {
        games[command.code] = command
    }

    return {
        games,
        createGame,
    }
}
