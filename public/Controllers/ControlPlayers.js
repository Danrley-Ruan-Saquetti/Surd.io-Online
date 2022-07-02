import StatePlayer from "../Models/StatePlayers.js"
import GeneratedCode from "./GeneratedCode.js"

export default function ControlPlayer() {
    const controlStatePlayer = StatePlayer()

    const DIMENSION_PLAYER = 40

    const createPlayer = (command, state) => {
        const code = command.code ? command.code : GeneratedCode(controlStatePlayer.players).code
        const player = {
            code: code,
            nickGame: command.name,
            level: 1,
            xp: 0,
            points: 0,
            health: 100,
            maxHealth: 100,
            dimension: { width: DIMENSION_PLAYER, height: DIMENSION_PLAYER },
            position: { x: Math.random() * (state.width - DIMENSION_PLAYER), y: Math.random() * (state.height - DIMENSION_PLAYER) },
            speed: { x: 0, y: 0 },
            key: { UP: false, DOWN: false, RIGHT: false, LEFT: false },
            lastKey: { vertical: "", horizontal: "" }
        }

        controlStatePlayer.createPlayer(player)
    }

    const removePlayer = (command) => {
        controlStatePlayer.removePlayer(command)
    }

    const updatePosition = (command) => {
        controlStatePlayer.updatePosition(command)
    }

    const updateKey = (command) => {
        controlStatePlayer.updateKey(command)
    }

    const updateLatsKey = (command) => {
        controlStatePlayer.updateLatsKey(command)
    }

    const getPlayers = () => {
        return controlStatePlayer.players
    }

    return {
        createPlayer,
        removePlayer,
        updatePosition,
        updateKey,
        updateLatsKey,
        getPlayers,
    }
}
