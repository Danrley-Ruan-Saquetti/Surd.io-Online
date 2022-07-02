export default function ControlRendererGame(canvasM) {
    const canvas = canvasM
    const ctx = canvas.getContext("2d")

    let state
    let user
    let runningGame
    let playingGame = false

    const registerUser = (command) => {
        user = command.user
    }

    const registerState = (command) => {
        state = command
    }

    const DIMENSION_CANVAS = {
        width: () => { return canvas.innerWidth },
        height: () => { return canvas.innerHeight }
    }

    const DIMENSION_WINDOW = {
        width: () => { return window.innerWidth },
        height: () => { return window.innerHeight }
    }

    const resizeCanvas = () => {
        canvas.width = DIMENSION_WINDOW.width()
        canvas.height = DIMENSION_WINDOW.height()
    }

    const start = () => {
        playingGame = true
        animate()
    }

    const quit = () => {
        playingGame = false
    }

    const draw = () => {

    }

    let a = 0
    const animate = () => {
        if (DIMENSION_CANVAS.height() != DIMENSION_WINDOW.height() || DIMENSION_CANVAS.width() != DIMENSION_WINDOW.width()) { resizeCanvas() }

        a++
        if (a % 200 == 0) {
            console.log(state);
        }

        if (playingGame) { runningGame = requestAnimationFrame(animate) }
    }

    return {
        start,
        quit,
        registerState,
        registerUser
    }
}
