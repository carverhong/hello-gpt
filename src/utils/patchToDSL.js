export function generateVueTemplate(dsl) {
    if (dsl[""]) {
        dsl = dsl[""];
    }
    const generateElement = (element) => {
        const children = element.children
            ? element.children.map(generateElement).join("\n")
            : "";
        const text = element.text ? element.text : "";
        return `<${element.tag}>${text}${children}</${element.tag}>`;
    };

    return `<template>${generateElement(dsl)}</template><script>export default {}</script>`;
}  