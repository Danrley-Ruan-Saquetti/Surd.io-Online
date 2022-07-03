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

    // Player
    const createPlayer = (command) => {
        const player = controlPlayer.createPlayer(command, MAP)

        return player
    }

    const removePlayer = (command) => {
        controlPlayer.removePlayer(command)
    }

    const movePlayer = (command) => {
        controlPlayer.movePlayer(command)
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
        acceptKey,
        getGames,
        getPlayers,
        MAP,
    }
}
