export default function StatePlayer() {
    const players = {}

    const createPlayer = (command) => {
        players[command.code] = command
    }

    const removePlayer = (command) => {
        delete players[command.code]
    }

    const movePlayer = {
        w: (command) => {
            players[command.code].position.y -= players[command.code].maxSpeed
        },
        s: (command) => {
            players[command.code].position.y += players[command.code].maxSpeed
        },
        d: (command) => {
            players[command.code].position.x += players[command.code].maxSpeed
        },
        a: (command) => {
            players[command.code].position.x -= players[command.code].maxSpeed
        },
    }

    const updateKey = {
        w: (command) => {
            players[command.code].key.UP = command.value
            if (command.value == true) { players[command.code].lastKey.vertical = "UP" }
        },
        s: (command) => {
            players[command.code].key.DOWN = command.value
            if (command.value == true) { players[command.code].lastKey.vertical = "DOWN" }
        },
        d: (command) => {
            players[command.code].key.RIGHT = command.value
            if (command.value == true) { players[command.code].lastKey.horizontal = "RIGHT" }
        },
        a: (command) => {
            players[command.code].key.LEFT = command.value
            if (command.value == true) { players[command.code].lastKey.horizontal = "LEFT" }
        },
    }

    return {
        players,
        createPlayer,
        removePlayer,
        movePlayer,
        updateKey,
    }
}
