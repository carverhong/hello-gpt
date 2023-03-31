export const msg1 = {
    "tag": "div",
    "class": "admin-panel",
    "children": [
        {
            "tag": "h1",
            "text": "Welcome to the Admin Panel"
        },
        {
            "tag": "div",
            "class": "user-list",
            "children": [
                {
                    "tag": "h2",
                    "text": "Users"
                },
                {
                    "tag": "ul",
                    "children": [
                        {
                            "tag": "li",
                            "repeat": "user in users",
                            "text": "{{ user.name }}"
                        }
                    ]
                }
            ]
        },
        {
            "tag": "div",
            "class": "product-list",
            "children": [
                {
                    "tag": "h2",
                    "text": "Products"
                },
                {
                    "tag": "ul",
                    "children": [
                        {
                            "tag": "li",
                            "repeat": "product in products",
                            "text": "{{ product.name }} - ${{ product.price }}"
                        }
                    ]
                }
            ]
        }
    ]
}

export const msg2 = {
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
    return `你现在是一个页面开发助手，你负责把我的需求转换成JSON配置数据的操作代码（使用JSONPatch描述），Important note: You simply return an array of JsonPatches

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
    Content: 生成一个学生管理系统的表格，需要包含姓名、年龄、性别、班级、总分，顺便给我生成五条数据
    Completion:  [
        { "op": "add", "path": "/", "value": 
            {
                "comp": "HelloTable",
                "params": {
                    "tableHeader": [
                        { "key": "name", "value": "姓名" }, 
                        { "key": "workid", "value": "工号" }, 
                        { "key": "gender", "value": "性别" },
                        { "key": "rank", "value": "职级" },
                        { "key": "address", "value": "家庭住址" }
                    ],
                    "tableData": [
                        { "name": "张三", "workid": "001", "gender": "男", "rank": "高级", "address": "北京市海淀区" },
                        { "name": "李四", "workid": "002", "gender": "女", "rank": "中级", "address": "上海市浦东新区" },
                        { "name": "王五", "workid": "003", "gender": "男", "rank": "初级", "address": "广州市天河区" },
                        { "name": "赵六", "workid": "004", "gender": "女", "rank": "高级", "address": "深圳市南山区" },
                        { "name": "刘七", "workid": "005", "gender": "男", "rank": "初级", "address": "武汉市江汉区" },
                    ],
                    "canEdit": true,
                    "canDelete": true
                }
            }
        }
    ]
    Content: ${val}
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
          使用jsonPatch来描述一个页面，例如：
          
          [
            { "op": "add", "path": "/", "value": 
                {
                    "comp": "HelloTable",
                    "params": {
                        "tableHeader": [
                            { "key": "name", "value": "姓名" }, 
                            { "key": "workid", "value": "工号" }, 
                            { "key": "gender", "value": "性别" },
                            { "key": "rank", "value": "职级" },
                            { "key": "address", "value": "家庭住址" }
                        ],
                        "tableData": [
                            { "name": "张三", "workid": "001", "gender": "男", "rank": "高级", "address": "北京市海淀区" },
                            { "name": "李四", "workid": "002", "gender": "女", "rank": "中级", "address": "上海市浦东新区" },
                            { "name": "王五", "workid": "003", "gender": "男", "rank": "初级", "address": "广州市天河区" },
                            { "name": "赵六", "workid": "004", "gender": "女", "rank": "高级", "address": "深圳市南山区" },
                            { "name": "刘七", "workid": "005", "gender": "男", "rank": "初级", "address": "武汉市江汉区" },
                        ],
                        "canEdit": true,
                        "canDelete": true
                    }
                }
            }
        ]
            `
        },
        {
            "role": "user",
            "content": `只需要输出一个JSONPatch的数组，例如
            [
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
            就可以了，不需要任何描述`
        },
        {
            "role": "assistant",
            "content": `
                如果我跟你说，这个表格是不可编辑的，请帮我去掉编辑按钮
                你需要输出
                [
                    {
                        "op": "replace",
                        "path": "/params/canEdit",
                        "value": false
                    }
                ]
            `
        },
        {
            "role": "user",
            "content": msg
        }
    ]
}

export const defaultMsg = [
    {
        "role": "system",
        "content": "你现在是一个页面开发助手，你负责把我的需求转换成JSON格式的DSL（使用JSON描述）"
    },
    {
        "role": "user",
        "content": `
        使用jsonPatch来描述一个页面，例如：

        [
            {
                "op": "add",
                "path": "/tag",
                "value": "table"
            },
            {
                "op": "add",
                "path": "/children",
                "value": [
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
                                        "text": "工号"
                                    },
                                    {
                                        "tag": "th",
                                        "text": "性别"
                                    },
                                    {
                                        "tag": "th",
                                        "text": "职级"
                                    },
                                    {
                                        "tag": "th",
                                        "text": "家庭住址"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "tag": "tbody",
                        "children": [
                            {
                                "tag": "tr",
                                "children": [
                                    {
                                        "tag": "td",
                                        "text": "张三"
                                    },
                                    {
                                        "tag": "td",
                                        "text": "001"
                                    },
                                    {
                                        "tag": "td",
                                        "text": "男"
                                    },
                                    {
                                        "tag": "td",
                                        "text": "初级"
                                    },
                                    {
                                        "tag": "td",
                                        "text": "北京市朝阳区"
                                    }
                                ]
                            },
                            {
                                "tag": "tr",
                                "children": [
                                    {
                                        "tag": "td",
                                        "text": "李四"
                                    },
                                    {
                                        "tag": "td",
                                        "text": "002"
                                    },
                                    {
                                        "tag": "td",
                                        "text": "女"
                                    },
                                    {
                                        "tag": "td",
                                        "text": "高级"
                                    },
                                    {
                                        "tag": "td",
                                        "text": "上海市浦东新区"
                                    }
                                ]
                            },
                            {
                                "tag": "tr",
                                "children": [
                                    {
                                        "tag": "td",
                                        "text": "王五"
                                    },
                                    {
                                        "tag": "td",
                                        "text": "003"
                                    },
                                    {
                                        "tag": "td",
                                        "text": "男"
                                    },
                                    {
                                        "tag": "td",
                                        "text": "中级"
                                    },
                                    {
                                        "tag": "td",
                                        "text": "广州市天河区"
                                    }
                                ]
                            },
                        ]
                    }
                ]
            }
        ]

        接下来以上面的示例页面为例，我们来做一些演练。
        `
    },
    {
        "role": "user",
        "content": `
            或者是这样的：

            [
                {
                    "op": "add",
                    "path": "/tag",
                    "value": "table"
                },
                {
                    "op": "add",
                    "path": "/children",
                    "value": [
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
                                            "text": "工号"
                                        },
                                        {
                                            "tag": "th",
                                            "text": "性别"
                                        },
                                        {
                                            "tag": "th",
                                            "text": "职级"
                                        },
                                        {
                                            "tag": "th",
                                            "text": "家庭住址"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "tag": "tbody",
                            "children": [
                                {
                                    "tag": "tr",
                                    "children": [
                                        {
                                            "tag": "td",
                                            "text": "张三"
                                        },
                                        {
                                            "tag": "td",
                                            "text": "001"
                                        },
                                        {
                                            "tag": "td",
                                            "text": "男"
                                        },
                                        {
                                            "tag": "td",
                                            "text": "初级"
                                        },
                                        {
                                            "tag": "td",
                                            "text": "北京市朝阳区"
                                        }
                                    ]
                                },
                                {
                                    "tag": "tr",
                                    "children": [
                                        {
                                            "tag": "td",
                                            "text": "李四"
                                        },
                                        {
                                            "tag": "td",
                                            "text": "002"
                                        },
                                        {
                                            "tag": "td",
                                            "text": "女"
                                        },
                                        {
                                            "tag": "td",
                                            "text": "高级"
                                        },
                                        {
                                            "tag": "td",
                                            "text": "上海市浦东新区"
                                        }
                                    ]
                                },
                            ]
                        }
                    ]
                }
            ]
        `
    },
    {
        "role": "user",
        "content": `
            其中路径path一定要正确，不能有任何的错误，否则会报错。
            比如说这样的路径就是错的："/children/1/children/-" ，这时因为在路径的最后有一个"-"，所以会报错。
        `
    },
    {
        "role": "user",
        "content": `
            请用ElementUI的Table组件来实现上面的表格。
        `
    },
    {
        "role": "user",
        "content": "在接下来的对话中，请不要有任何的中文描述，我只需要一个JSONPatch的数组"
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