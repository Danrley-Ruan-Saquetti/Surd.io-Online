import StateGame from "../Models/StateGame.js"
import ControlPlayer from "./ControlPlayers.js"
import GeneratedCode from "./GeneratedCode.js"

export default function ControlGame() {
    const controlStateGame = StateGame()
    const controlPlayer = ControlPlayer()

    const MAP = {
        dimension: { width: 10000, height: 10000 }
    }

    const observers = []

    const FPS = 1000 / 60
    let updateInterval

    const subscribeObserver = (observerFunction) => {
        observers.push(observerFunction)
    }

    const notifyAll = (type, command) => {
        observers.forEach((observerFunction) => {
            observerFunction(type, command)
        })
    }

    const createGame = (command) => {
        const code = command.code ? command.code : GeneratedCode(controlStateGame.games).code
        const game = {
            code: code
        }

        controlStateGame.createGame(game)
    }

    // Running game
    const start = () => {
        updateInterval = setInterval(() => updateGame(), FPS)
    }

    const updateGame = () => {
        movePlayers()
    }

    const movePlayers = () => {
        Object.keys(controlPlayer.getPlayers()).map((i) => {
            const player = controlPlayer.getPlayers()[i]

            movePlayer(player)
        })
    }

    // Player
    const createPlayer = (command) => {
        const player = controlPlayer.createPlayer(command, MAP)

        return player
    }

    const removePlayer = (command) => {
        controlPlayer.removePlayer(command)
    }

    const movePlayer = (command) => {
        if (controlPlayer.movePlayer(command)) {
            notifyAll("player-move", { code: command.code, position: command.position })
        }
    }

    const setPositionPlayer = (command) => {
        controlPlayer.setPositionPlayer(command)
    }

    const acceptKey = (command) => {
        controlPlayer.updateKey(command)
    }

    const getGames = () => {
        return controlStateGame.games
    }

    const getPlayers = () => {
        return controlPlayer.getPlayers()
    }

    return {
        subscribeObserver,
        createGame,
        createPlayer,
        removePlayer,
        setPositionPlayer,
        acceptKey,
        getGames,
        getPlayers,
        MAP,
    }
}
