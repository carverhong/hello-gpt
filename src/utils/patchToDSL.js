export function generateVueTemplate(dsl) {
    if (dsl[""]) {
        dsl = dsl[""];
    }
    if (dsl["0"]) {
        dsl = dsl["0"];
    }
    const generateElement = (element) => {
        const children = element.children
            ? element.children.map(generateElement).join("\n")
            : "";
        const text = element.text ? element.text : "";
        return `<${element.tag}>${text}${children}</${element.tag}>`;
    };

    return `<template><div id="result">${generateElement(dsl)}</div></template><script>export default {}</script>`;
}

export function generateTemplate(dslData) {
    // 解析数据，取出需要生成的数据项
    const { tag, props, children, data } = dslData;

    // 生成 Vue 的模板代码
    let templateCode = `<${tag}`;
    if (props) {
        for (let key in props) {
            templateCode += ` ${key}="${props[key]}"`;
        }
    }
    templateCode += '>\n';
    if (children) {
        for (let child of children) {
            // 处理子节点是普通标签的情况
            if (child.tag) {
                templateCode += generateTemplate(child);
            }
            // 处理子节点是插槽的情况
            else if (child.scopedSlots) {
                for (let key in child.scopedSlots) {
                    templateCode += `<template ${key}>\n`;
                    for (let element of child.scopedSlots[key]) {
                        templateCode += generateTemplate(element);
                    }
                    templateCode += `</template>\n`;
                }
            }
        }
    }
    templateCode += `</${tag}>`;

    // 返回生成的 Vue 模板代码
    return templateCode;
}