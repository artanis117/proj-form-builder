export const CharacterDetector = {
    setClass(el, binding, vnode) {
        const size = binding.value || 40
        const text = el.innerHTML || ''
        let new_text = ''
        if (text.length > size) {
            const styled_text = `<span style="color: red">${text.slice(size, text.length)}</span>`
            new_text = `${text.slice(0, size)}${styled_text}`
            el.innerHTML = new_text
        }
    },
    inserted(el, binding, vnode) {
        CharacterDetector.setClass(el, binding, vnode)
    },
    componentUpdated(el, binding, vnode) {
        CharacterDetector.setClass(el, binding, vnode)
    }
}