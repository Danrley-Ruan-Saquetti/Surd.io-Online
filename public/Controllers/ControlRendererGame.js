export default function ControlRendererGame(gameM, canvasM) {
    const game = gameM

    const canvas = canvasM
    const ctx = canvas.getContext("2d")

    let user

    const registerUser = (command) => {
        user = command.user
    }

    let runningGame

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
        animate()
    }

    const quit = () => {

    }


    const animate = () => {

        runningGame = requestAnimationFrame(animate)
    }

    resizeCanvas()

    return {
        start,
        registerUser
    }
}
