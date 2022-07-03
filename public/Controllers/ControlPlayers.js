import StatePlayer from "../Models/StatePlayers.js"
import GeneratedCode from "./GeneratedCode.js"

export default function ControlPlayer() {
    const controlStatePlayer = StatePlayer()

    const DIMENSION_PLAYER = 40

    const createPlayer = (command, map) => {
        const code = command.code ? command.code : GeneratedCode(controlStatePlayer.players).code
        const player = {
            code: code,
            serverCode: command.serverConnected ? command.serverConnected : command.serverCode ? command.serverCode : null,
            name: command.name,
            level: command.level ? command.level : 1,
            xp: command.xp ? command.xp : 0,
            points: command.points ? command.points : 0,
            health: command.health ? command.health : 100,
            maxHealth: command.maxHealth ? command.maxHealth : 100,
            dimension: { width: DIMENSION_PLAYER, height: DIMENSION_PLAYER },
            position: command.position ? command.position : { x: Math.random() * (map.dimension.width - DIMENSION_PLAYER) + DIMENSION_PLAYER, y: Math.random() * (map.dimension.height - DIMENSION_PLAYER) + DIMENSION_PLAYER }, // { x: (map.dimension.width / 2) + Math.round() * 100, y: (map.dimension.height / 2) + Math.round() * 100 }, 
            speed: { x: 0, y: 0 },
            maxSpeed: command.maxSpeed ? command.maxSpeed : 3,
            key: { UP: false, DOWN: false, RIGHT: false, LEFT: false },
            lastKey: { vertical: "", horizontal: "" }
        }

        controlStatePlayer.createPlayer(player)

        return player
    }

    const removePlayer = (command) => {
        controlStatePlayer.removePlayer(command)
    }

    const movePlayer = (command) => {
        let _playerMoved = false
        if (controlStatePlayer.players[command.code].key.UP && controlStatePlayer.players[command.code].lastKey.vertical == "UP") {
            controlStatePlayer.movePlayer["w"](command)
            _playerMoved = true
        } else if (controlStatePlayer.players[command.code].key.DOWN && controlStatePlayer.players[command.code].lastKey.vertical == "DOWN") {
            controlStatePlayer.movePlayer["s"](command)
            _playerMoved = true
        }
        if (controlStatePlayer.players[command.code].key.RIGHT && controlStatePlayer.players[command.code].lastKey.horizontal == "RIGHT") {
            controlStatePlayer.movePlayer["d"](command)
            _playerMoved = true
        } else if (controlStatePlayer.players[command.code].key.LEFT && controlStatePlayer.players[command.code].lastKey.horizontal == "LEFT") {
            controlStatePlayer.movePlayer["a"](command)
            _playerMoved = true
        }

        return _playerMoved
    }

    const updateKey = (command) => {
        if (controlStatePlayer.updateKey[command.key]) {
            controlStatePlayer.updateKey[command.key](command)
        }
    }

    const getPlayers = () => {
        return controlStatePlayer.players
    }

    return {
        createPlayer,
        removePlayer,
        movePlayer,
        updateKey,
        getPlayers,
    }
}
