const msg1 = {
    comp: "HelloTable",
    params: {
        tableHeader: ["name", "age", "gender", "address"],
        tableData: [
            { name: "John", age: 18, gender: "Male", address: "New York" },
            { name: "Jane", age: 22, gender: "Female", address: "London" },
            { name: "Bob", age: 32, gender: "Male", address: "Paris" },
            { name: "Tom", age: 24, gender: "Male", address: "Tokyo" },
        ],
    },
}
const msg2 = {
    comp: "HelloTable",
    params: {
        tableHeader: ["name", "age", "gender", "class", "totalScore"],
        tableData: [
            { name: "John", age: 18, gender: "Male", class: "三年一班", totalScore: 396 },
            { name: "Jane", age: 22, gender: "Female", class: "三年一班", totalScore: 481 },
            { name: "Bob", age: 32, gender: "Male", class: "三年二班", totalScore: 431 },
            { name: "Tom", age: 24, gender: "Male", class: "三年三班", totalScore: 412 },
        ],
        canEdit: true,
        canDelete: true,
    },
}

export function generatePrompt(val) {
    const capitalized =
        val[0].toUpperCase() + val.slice(1).toLowerCase();
    return `你现在是一个页面开发助手，你负责把我的需求转换成JSON配置数据的操作代码（使用JSONPatch描述）

    Content: 生成一个管理平台
    Completion: ${msg1}
    Content: 生成一个学生管理系统的表格
    Completion: ${msg2}
    Content: ${capitalized}
    Completion:`;
}