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

function createElement(node) {
    if (typeof node === 'string') {
        return node;
    }
    const { tag, props = [], children = [], on = {}, text = '' } = node;
    const propsString = Object.keys(props)
        .map(key => {
            if (key.startsWith(':')) {
                if (typeof props[key] === 'object') {
                    feData.data[`${key.slice(1)}`] = props[key];
                    return `:${key.slice(1)}="${key.slice(1)}"`;
                } else {
                    return `:${key.slice(1)}="${props[key]}"`;
                }
            } else if (key === 'v-model') {
                feData.data[`${props[key]}`] = '';
                return `${key}="${props[key]}"`;
            } else if (['boolean', 'number'].includes(typeof props[key])) {
                return `:${key}="${props[key]}"`;
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

// const node = {
//     "tag": "div",
//     "children": [
//         {
//             "tag": "el-input",
//             "props": {
//                 "v-model": "searchTitle",
//                 "placeholder": "请输入标题关键词",
//                 "prefix-icon": "el-icon-search",
//                 "clearable": true,
//                 "size": "small",
//                 "style": "margin-bottom: 10px;"
//             }
//         },
//         {
//             "tag": "el-date-picker",
//             "props": {
//                 "v-model": "searchDate",
//                 "type": "date",
//                 "placeholder": "选择日期",
//                 "size": "small",
//                 "style": "margin-bottom: 10px;"
//             }
//         },
//         {
//             "tag": "el-table",
//             "props": {
//                 ":data": "tableData",
//                 ":header-row-class-name": "'header-row-class-name'",
//                 ":highlight-current-row": true,
//                 ":row-class-name": "'row-class-name'",
//                 "style": "width: 100%;"
//             },
//             "children": [
//                 {
//                     "tag": "el-table-column",
//                     "props": {
//                         "label": "标题",
//                         "prop": "title",
//                         "width": "50%"
//                     }
//                 },
//                 {
//                     "tag": "el-table-column",
//                     "props": {
//                         "label": "日期",
//                         "prop": "date",
//                         "width": "50%"
//                     }
//                 }
//             ]
//         },
//         {
//             "tag": "el-pagination",
//             "props": {
//                 "@size-change": "handleSizeChange",
//                 "@current-change": "handleCurrentChange",
//                 ":current-page.sync": "currentPage",
//                 ":page-size.sync": "pageSize",
//                 ":total": "tableData.length",
//                 "layout": "total, sizes, prev, pager, next, jumper",
//                 "style": "margin-top: 10px;"
//             }
//         }
//     ]
// }

// const result = transformSDLToVue(node)
