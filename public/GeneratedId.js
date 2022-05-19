const ID_LENGTH = 20

export default function generatedId(type) {
    const VALID_ID = (id) => {
        Object.keys(type).map((t) => {
            if (type[t].id == id) { return false }
        })
        return true
    }
    const CHARACTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*-+_?"

    let id = ""
    do {
        for (let i = 0; i < ID_LENGTH; i++) {
            id += CHARACTERS[Math.round(Math.random() * (CHARACTERS.length - 1))]
        }
    } while (!VALID_ID(id));

    return { id }
}
