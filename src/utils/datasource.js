const msg1 = {
    comp: "HelloTable",
    params: {
        tableHeader: [
            { key: "name", value: "姓名" },
            { key: "age", value: "年龄" },
            { key: "gender", value: "性别" },
            { key: "address", value: "地址" }
        ],
        tableData: [
            { name: "John", age: 18, gender: "Male", address: "New York" },
            { name: "Jane", age: 22, gender: "Female", address: "London" },
            { name: "Bob", age: 32, gender: "Male", address: "Paris" },
            { name: "Tom", age: 24, gender: "Male", address: "Tokyo" },
        ],
        canEdit: true,
        canDelete: true,
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
    return `
    Content: 生成一个管理平台
    Completion: [
        {"op": "add", "path": "/comp", "value": "HelloTable"},
        {"op": "add", "path": "/params/tableHeader", "value": [
            {"key": "name", "value": "姓名"},
            {"key": "workid", "value": "工号"},
            {"key": "gender", "value": "性别"},
            {"key": "rank", "value": "职级"},
            {"key": "address", "value": "家庭住址"}
        ]},
        {"op": "add", "path": "/params/tableData", "value": [
            {"name": "张三", "workid": "001", "gender": "男", "rank": "高级", "address": "北京市海淀区"},
            {"name": "李四", "workid": "002", "gender": "女", "rank": "中级", "address": "上海市浦东新区"},
            {"name": "王五", "workid": "003", "gender": "男", "rank": "初级", "address": "广州市天河区"},
            {"name": "赵六", "workid": "004", "gender": "女", "rank": "高级", "address": "深圳市南山区"},
            {"name": "孙七", "workid": "005", "gender": "男", "rank": "初级", "address": "武汉市江汉区"}
        ]},
        {"op": "add", "path": "/params/canEdit", "value": true},
        {"op": "add", "path": "/params/canDelete", "value": true}
    ]
    Content: 生成一个学生管理系统的表格，需要包含姓名、年龄、性别、班级、总分，顺便给我生成五条数据
    Completion: [
        { "op": "add", "path": "/", "value": 
            {
                "comp": "HelloTable",
                "params": {
                    "tableHeader": [
                        { "key": "name", "value": "姓名" }, 
                        { "key": "age", "value": "年龄" }, 
                        { "key": "gender", "value": "性别" },
                        { "key": "class", "value": "班级" },
                        { "key": "totalScore", "value": "总分" }
                    ],
                    "tableData": [
                        { "name": "张三", "age": 18, "gender": "男", "class": "一班", "totalScore": 85 },
                        { "name": "李四", "age": 19, "gender": "女", "class": "二班", "totalScore": 76 },
                        { "name": "王五", "age": 20, "gender": "男", "class": "三班", "totalScore": 92 },
                        { "name": "赵六", "age": 18, "gender": "女", "class": "二班", "totalScore": 80 },
                        { "name": "刘七", "age": 20, "gender": "男", "class": "一班", "totalScore": 88 },
                    ],
                    "canEdit": true,
                    "canDelete": true
                }
            }
        }
    ]
    Content: ${capitalized}，默认按照上一个示例来生成JSON数据
    Completion:`;
}

export const messages = (msg) => {
    return [
        {
            "role": "system",
            "content": "你现在是一个页面开发助手，你负责把我的需求转换成JSON配置数据的操作代码（使用JSONPatch描述）"
        },
        {
            "role": "user",
            "content": `
          使用json来描述一个页面，例如：
          
          {
            comp: "HelloTable",
            params: {
              tableHeader: [
                {key: "name", value: "姓名"}, 
                {key: "age", value: "年龄"}, 
                {key: "gender", value: "性别"}, 
                {key: "address", value: "地址"}
            ],
            tableData: [
                { name: "John", age: 18, gender: "Male", address: "New York" },
                { name: "Jane", age: 22, gender: "Female", address: "London" },
                { name: "Bob", age: 32, gender: "Male", address: "Paris" },
                { name: "Tom", age: 24, gender: "Male", address: "Tokyo" },
              ],
              canEdit: true,
              canDelete: true,
            },
          }
            
      
            其中comp属性代表这个页面的根组件及其参数，comp参数指定组件的类型（只能选HelloTable），params是type所指定组件需要的参数。
            
            以下是各个组件的参数说明： 
            HelloTable: 表格组件
            tableHeader： 表格的表头
            tableData: 表格的数据
            canEdit: 是否可以编辑
            canDelete: 是否可以删除
    
            接下来以上面的示例页面配置为例，我们来做一些演练。
            `
        },
        {
            "role": "user",
            "content": "只需要输出一个JSONPatch的数组，例如：" + msg1 + "就可以了，不需要任何描述"
        },
        {
            "role": "user",
            "content": "只需要输出一个JSONPatch的数组。" + msg
        }
    ]
}

export const defaultMsg = [
    {
        "role": "system",
        "content": "你现在是一个页面开发助手，你负责把我的需求转换成JSON配置数据的操作代码，使用JavaScript语言的JSONPatch描述，并且接下来的发言你只需要告诉我你的操作代码，不需要任何描述"
    },
    {
        "role": "user",
        "content": `
        使用json来描述一个页面，例如：

        {
            comp: "HelloTable",
            params: {
                tableHeader: [
                    {key: "name", value: "姓名"}, 
                    {key: "age", value: "年龄"}, 
                    {key: "gender", value: "性别"}, 
                    {key: "address", value: "地址"}
                ],
                tableData: [
                    { name: "John", age: 18, gender: "Male", address: "New York" },
                    { name: "Jane", age: 22, gender: "Female", address: "London" },
                    { name: "Bob", age: 32, gender: "Male", address: "Paris" },
                    { name: "Tom", age: 24, gender: "Male", address: "Tokyo" },
                ],
                canEdit: true,
                canDelete: true,
            },
        }
        

        其中comp属性代表这个页面的根组件及其参数，comp参数指定组件的类型（只能选HelloTable），params是type所指定组件需要的参数。
        
        以下是各个组件的参数说明： 
        HelloTable: 表格组件
        tableHeader： 表格的表头，它是一个数组类型，数组中的每个元素是一个对象，对象中有两个属性：key和value，key是表头的key，value是表头的显示值
        tableData: 表格的数据，它是一个数组类型
        canEdit: 是否可以编辑
        canDelete: 是否可以删除

        接下来以上面的示例页面配置为例，我们来做一些演练。
        `
    },
    {
        "role": "user",
        "content": "请不要有任何的中文描述，我只需要一个JSONPatch的数组"
    },
]

export const messages2 = [
    {
        "role": "user",
        "content": `
      "现定义"
      "视频模型video, 有以下字段:title, duration, author, create_time, category, tags, can_play"
      "用户模型User,有以下字段：name, email, birthday, gender, last_login_time, is_vip"
    `
    }, {
        "role": "user",
        "content": `
    现在有一个空页面，初始配置数据如下，后续的操作都基于这个页面来进行：
    {
      "name": "测试",
      "id": "test",
      "component": {}
    }
    `
    }
]