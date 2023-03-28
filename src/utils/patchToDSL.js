const data = [
    {
        "op": "add",
        "path": "/",
        "value": {
            "tag": "div",
            "children": [
                {
                    "tag": "table",
                    "children": [
                        {
                            "tag": "thead",
                            "children": [
                                {
                                    "tag": "tr",
                                    "children": [
                                        {
                                            "tag": "th",
                                            "text": "姓名"
                                        },
                                        {
                                            "tag": "th",
                                            "text": "性别"
                                        },
                                        {
                                            "tag": "th",
                                            "text": "班级"
                                        },
                                        {
                                            "tag": "th",
                                            "text": "职级"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "tag": "tbody",
                            "children": []
                        }
                    ]
                }
            ]
        }
    },
    // {
    //     "op": "add",
    //     "path": "/children/0/children/1/children",
    //     "value": [
    //         {
    //             "tag": "tr",
    //             "children": [
    //                 {
    //                     "tag": "td",
    //                     "text": "张三"
    //                 },
    //                 {
    //                     "tag": "td",
    //                     "text": "男"
    //                 },
    //                 {
    //                     "tag": "td",
    //                     "text": "一班"
    //                 },
    //                 {
    //                     "tag": "td",
    //                     "text": "教授"
    //                 }
    //             ]
    //         },
    //         {
    //             "tag": "tr",
    //             "children": [
    //                 {
    //                     "tag": "td",
    //                     "text": "李四"
    //                 },
    //                 {
    //                     "tag": "td",
    //                     "text": "女"
    //                 },
    //                 {
    //                     "tag": "td",
    //                     "text": "二班"
    //                 },
    //                 {
    //                     "tag": "td",
    //                     "text": "副教授"
    //                 }
    //             ]
    //         },
    //         {
    //             "tag": "tr",
    //             "children": [
    //                 {
    //                     "tag": "td",
    //                     "text": "王五"
    //                 },
    //                 {
    //                     "tag": "td",
    //                     "text": "男"
    //                 },
    //                 {
    //                     "tag": "td",
    //                     "text": "三班"
    //                 },
    //                 {
    //                     "tag": "td",
    //                     "text": "讲师"
    //                 }
    //             ]
    //         },
    //         {
    //             "tag": "tr",
    //             "children": [
    //                 {
    //                     "tag": "td",
    //                     "text": "赵六"
    //                 },
    //                 {
    //                     "tag": "td",
    //                     "text": "女"
    //                 },
    //                 {
    //                     "tag": "td",
    //                     "text": "四班"
    //                 },
    //                 {
    //                     "tag": "td",
    //                     "text": "助教"
    //                 }
    //             ]
    //         },
    //         {
    //             "tag": "tr",
    //             "children": [
    //                 {
    //                     "tag": "td",
    //                     "text": "钱七"
    //                 },
    //                 {
    //                     "tag": "td",
    //                     "text": "男"
    //                 },
    //                 {
    //                     "tag": "td",
    //                     "text": "五班"
    //                 },
    //                 {
    //                     "tag": "td",
    //                     "text": "教授"
    //                 }
    //             ]
    //         }
    //     ]
    // }
]

export function applyPatch(object, patch) {
    patch.forEach(operation => {
        switch (operation.op) {
            case 'add':
                add(object, operation.path, operation.value);
                break;
            case 'replace':
                replace(object, operation.path, operation.value);
                break;
            case 'remove':
                remove(object, operation.path);
                break;
        }
    });
    return object;
}

export function add(object, path, value) {
    const parts = path.split('/');
    let target = object;
    for (let i = 1; i < parts.length - 1; i++) {
        target = target[parts[i]];
    }
    if (Array.isArray(target)) {
        target.splice(parts[parts.length - 1], 0, value);
    } else {
        target[parts[parts.length - 1]] = value;
    }
}

export function replace(object, path, value) {
    const parts = path.split('/');
    let target = object;
    for (let i = 1; i < parts.length - 1; i++) {
        target = target[parts[i]];
    }
    target[parts[parts.length - 1]] = value;
}

export function remove(object, path) {
    const parts = path.split('/');
    let target = object;
    for (let i = 1; i < parts.length - 1; i++) {
        target = target[parts[i]];
    }
    if (Array.isArray(target)) {
        target.splice(parts[parts.length - 1], 1);
    } else {
        delete target[parts[parts.length - 1]];
    }
}

export function patchToDSL(patch) {
    if (typeof patch === 'string') {
        patch = eval(patch);
    }
    const dsl = {};
    patch.forEach(operation => {
        const parts = operation.path.split('/');
        console.log(parts);
        let target = dsl;
        for (let i = 1; i < parts.length - 1; i++) {
            if (!target.children) {
                target.children = [];
            }
            const existingChild = target.children.find(child => child.tag === parts[i]);
            if (existingChild) {
                target = existingChild;
            } else {
                const newChild = {
                    tag: parts[i]
                };
                target.children.push(newChild);
                target = newChild;
            }
        }
        console.log(target);
        switch (operation.op) {
            case 'add':
                add(target, `/${parts[parts.length - 1]}`, operation.value);
                break;
            case 'replace':
                replace(target, `/${parts[parts.length - 1]}`, operation.value);
                break;
            case 'remove':
                remove(target, `/${parts[parts.length - 1]}`);
                break;
        }
        if (target['']) {
            target = target[''];
        }
        console.log(target);
    });
    console.log(dsl);
    return dsl.children[0];
}

export function dslToVueTemplate(dsl) {
    let template = `<${dsl.tag}>\n`;
    if (dsl.children) {
        for (let child of dsl.children) {
            if (child.tag === "tr") {
                template += `\t<${child.tag}>\n`;
                for (let td of child.children) {
                    template += `\t\t<${td.tag}>${td.text}</${td.tag}>\n`;
                }
                template += `\t</${child.tag}>\n`;
            } else {
                template += dslToVueTemplate(child);
            }
        }
    }
    template += `</${dsl.tag}>\n`;
    return template;
}


patchToDSL(data)