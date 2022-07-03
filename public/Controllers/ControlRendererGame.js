export default function ControlRendererGame(canvasM) {
    const canvas = canvasM
    const ctx = canvas.getContext("2d")

    const DIMENSION_WINDOW = {
        width: () => { return innerWidth },
        height: () => { return innerHeight }
    }

    const DIMENSION_CANVAS = {
        width: () => { return canvas.clientWidth },
        height: () => { return canvas.clientHeight }
    }

    const CAMERA = {
        getXMaster: (playerPos, playerDim) => {
            let x = (playerPos.x + (playerDim.width / 2)) - (DIMENSION_CANVAS.width() / 2)

            if (x < 0) x = 0
            else if (x + DIMENSION_CANVAS.width() > state.map.dimension.width) x = state.map.dimension.width - DIMENSION_CANVAS.width()

            return x
        },
        getYMaster: (playerPos, playerDim) => {
            let y = (playerPos.y + (playerDim.height / 2)) - (DIMENSION_CANVAS.height() / 2)

            if (y < 0) y = 0
            else if (y + DIMENSION_CANVAS.height() > state.map.dimension.height) y = state.map.dimension.height - DIMENSION_CANVAS.height()

            return y
        },
        getPosition: (posObject, dimObject) => {
            const x = posObject.x - CAMERA.getXMaster(posObject, dimObject)
            const y = posObject.y - CAMERA.getYMaster(posObject, dimObject)

            return { x, y }
        }
    }

    const COLORS = {
        player: "#ff0000",
        otherPlayers: "#949494",
        backgroundMap: "#fff",
    }

    let state
    let user
    let animateFrame
    let runningGame = false

    const registerUser = (command) => {
        user = command
    }

    const registerState = (command) => {
        state = command
    }

    const resizeCanvas = () => {
        canvas.width = DIMENSION_WINDOW.width()
        canvas.height = DIMENSION_WINDOW.height()
    }

    const start = () => {
        runningGame = true
        animate()
    }

    const quit = () => {
        runningGame = false
    }

    const draw = () => {
        const drawRect = (x, y, w, h, color) => {
            // console.log(x, y);
            ctx.fillStyle = color
            ctx.fillRect(x, y, w, h)
        }

        const drawPlayer = () => {
            const player = state.players[user.code]

            let x = player.position.x - CAMERA.getXMaster(player.position, player.dimension)
            let y = player.position.y - CAMERA.getYMaster(player.position, player.dimension)
            let w = player.dimension.width
            let h = player.dimension.height

            drawRect(x, y, w, h, COLORS.player)
        }

        const drawPlayers = () => {
            Object.keys(state.players).map((i) => {
                const player = state.players[i]
                if (player.serverCode != state.players[user.code].serverCode) { return }

                let x = player.position.x - CAMERA.getXMaster(player.position, player.dimension)
                let y = player.position.y - CAMERA.getYMaster(player.position, player.dimension)
                let w = player.dimension.width
                let h = player.dimension.height

                drawRect(x, y, w, h, COLORS.otherPlayers)
            })
        }

        drawRect(0, 0, DIMENSION_CANVAS.width(), DIMENSION_CANVAS.height(), COLORS.backgroundMap)
        drawPlayers()
        drawPlayer()
    }

    const animate = () => {
        if (!runningGame) { return }
        if (DIMENSION_CANVAS.height() != DIMENSION_WINDOW.height() || DIMENSION_CANVAS.width() != DIMENSION_WINDOW.width()) { resizeCanvas() }

        draw()

        // runningGame = false

        animateFrame = requestAnimationFrame(animate)
    }

    return {
        start,
        quit,
        registerState,
        registerUser
    }
}
