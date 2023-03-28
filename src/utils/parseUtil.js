export function convertOperationsToJSON(operations) {
    let json = this.json;
    operations = this.extractJSON(operations);

    console.log('operations: ', operations);

    for (const operation of operations) {
        const path = operation.path.substring(1).split('/');
        let current = json;

        for (let i = 0; i < path.length; i++) {
            const key = path[i];
            const isLastKey = i === path.length - 1;
            const value = isLastKey ? operation.value : {};

            if (operation.op === 'add') {
                if (path[i] === '') { // add root object
                    json = value;
                    break;
                }
                if (isLastKey) {
                    current[key] = value;
                } else if (!current[key]) {
                    current[key] = {};
                }

                current = current[key];
            } else if (operation.op === 'replace') {
                if (isLastKey) {
                    current[key] = value;
                } else if (current[key]) {
                    current = current[key];
                } else {
                    break;
                }
            } else if (operation.op === 'remove') {
                delete current[key];
                break;
            }
        }
    }

    return json;
}

// 过滤中文
export function filterJsonPatch(str) {
    const patchArr = [];

    const jsonStr = str.replace(/[\u4e00-\u9fa5]/g, '').replace(/[^a-zA-Z0-9{}[\]/\-,._]/g, '');

    console.log(jsonStr);

    try {
        const parsed = JSON.parse(jsonStr);

        if (Array.isArray(parsed)) {
            parsed.forEach((item) => {
                if (item.op && item.path && item.value) {
                    patchArr.push(item);
                }
            });
        }
    } catch (err) {
        console.error('Error parsing JSON:', err);
    }

    return patchArr;
}

export function extractJSON(input) {
    //   const regex = /^\s*\[(.*)\]\s*$/s;
    //   const match = input.match(regex);
    //   if (match) {
    //     return match[1];
    //   }
    //   return null;

    const regex = /\[([\s\S]+)\]/; // 匹配最外层的中括号及其中的内容
    const match = input.match(regex); // 在输入中搜索匹配项
    if (match) {
        return eval(`[${match[1]}]`); // 返回匹配项中的第一个子表达式（即中括号内的内容）
    } else {
        return null; // 如果未找到匹配项，则返回 null
    }
}