class FeData {
    _data = {};
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
    }
}
let feData = new FeData();

let mockData = [
    "yearMonth",
    "pmi",
    "production",
    "newOrders",
    "rawMaterialInventory",
    "employment",
    "supplierDeliveryTime",
    "newExportOrders",
    "imports",
    "purchasingVolume",
    "mainRawMaterialPurchasePrice",
    "factoryPrice",
    "finishedProductInventory",
    "onHandOrders",
    "businessActivityExpectations",
]

function createElement(node) {
    if (typeof node === 'string') {
        return node;
    }
    const { tag, props = [], children = [], on = {}, text = '' } = node;
    const propsString = Object.keys(props)
        .map(key => {
            if (key.startsWith(':')) {
                if (typeof props[key] === 'object') {
                    feData.data[`${underscoreToCamel(key.slice(1))}`] = props[key];
                    return `:${key.slice(1)}="${underscoreToCamel(key.slice(1))}"`;
                } else {
                    return `:${key.slice(1)}="${props[key]}"`;
                }
            } else if (key === 'v-model') {
                feData.data[`${props[key]}`] = '';
                return `${key}="${props[key]}"`;
            } else if (['boolean', 'number'].includes(typeof props[key])) {
                return `:${key}="${props[key]}"`;
            } else if (key === 'label' || key === 'prop') {
                return `${key}="${mockData.shift()}"`;
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
    return { template: `<template><div id="result">${vueTemplate}</div></template>`, feData: feData.data || {} };
}

// 下划线转驼峰
function underscoreToCamel(str) {
    let arr = str.split('-');
    let camelStr = '';

    for (let i = 0; i < arr.length; i++) {
        if (i === 0) {
            camelStr += arr[i];
        } else {
            let temp = arr[i][0].toUpperCase() + arr[i].slice(1);
            camelStr += temp;
        }
    }

    return camelStr;
}
