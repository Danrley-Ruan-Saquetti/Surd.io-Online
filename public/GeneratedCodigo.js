const CODIGO_LENGTH = 10

export default function createGeneratedCodigo(type) {
    const VALID_CODIGO = (codigo) => {
        Object.keys(type).map((t) => {
            if (type[t].codigo == codigo) { return false }
        })
        return true
    }
    const CHARACTERS = "0123456789"

    let codigo = ""
    do {
        for (let i = 0; i < CODIGO_LENGTH; i++) {
            codigo += CHARACTERS[Math.round(Math.random() * (CHARACTERS.length - 1))]
        }
    } while (!VALID_CODIGO(codigo));

    return { codigo }
}
