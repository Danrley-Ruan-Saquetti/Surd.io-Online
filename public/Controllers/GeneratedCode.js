const LENGTH_CODE = 10

export default function generatedCode(T) {
    const VALID_CODE = (code) => {
        Object.keys(T).map((t) => {
            if (T[t].code == code) { return false }
        })

        return true
    }

    const CHARACTERS = "0123456789"

    let code
    do {
        code = ""
        for (let i = 0; i < LENGTH_CODE; i++) {
            code += CHARACTERS[Math.round(Math.random() * (CHARACTERS.length - 1))]
        }

    } while (!VALID_CODE(code));

    return { code }
}
