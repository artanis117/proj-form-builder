import Vue from 'vue'

/* A global event bus */
export const EventBus = new Vue()

/**
 * Generates a random uuid in the format: xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
 */
export function uuidv4() {
    var crypto = window.crypto || window.msCrypto
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    )
}

/**
 * Gets a string and capitalizes every word in that string and makes the other letters lowercase
 */
export function capitalizeFirstLetter(str) {
    let parts = str.split(' ')
    let result = ''
    for (let part of parts) {
        result += part.charAt(0).toUpperCase() + part.slice(1).toLowerCase() + ' '
    }
    return result.slice(0, -1)
}
