const LENGTH_CODE = 10

export default function GeneratedCode(T) {
    const VALID_CODE = (code) => {
        let _validCode = true

        Object.keys(T).map((t) => {
            if (!_validCode) { return }
            if (T[t].code == code) { _validCode = false }
        })

        return _validCode
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
