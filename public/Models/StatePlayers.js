export default function StatePlayer() {
    const players = {}

    const createPlayer = (command) => {
        players[command.code] = command
    }

    const removePlayer = (command) => {
        delete players[command.code]
    }

    const updatePosition = (command) => {
        players[command.code].position = command.position
    }

    const updateKey = (command) => {
        players[command.code].key = command.key
    }

    const updateLatsKey = (command) => {
        players[command.code].latsKey = command.latsKey
    }

    return {
        players,
        createPlayer,
        removePlayer,
        updatePosition,
        updateKey,
        updateLatsKey,
    }
}
