function createElement(node) {
    if (typeof node === 'string') {
        return node;
    }
    const { tag, props = [], children = [], on = {}, text = '' } = node;
    const propsString = Object.keys(props)
        .map(key => {
            if (key === 'data' || key === ':data') {
                return `:data="list"`;
            } else if (key.startsWith(':')) {
                return `:${key.slice(1)}="${props[key]}"`;
            } else {
                return `${key}="${props[key]}"`;
            }
        })
        .join(' ');
    const onString = Object.keys(on)
        .map(eventName => `@${eventName}="${on[eventName]}"`)
        .join(' ');
    const childrenString = Array.isArray(children) ? children.map(createElement).join('') : children;
    const textString = text;
    return `<${tag} ${propsString} ${onString}>${childrenString || textString}</${tag}>`;
}

export function transformSDLToVue(sdl) {
    const vueTemplate = createElement(sdl);
    return ` <template><div id="result">${vueTemplate}</div></template><script>export default { data () { return { list: []}}}</script>`;
}
