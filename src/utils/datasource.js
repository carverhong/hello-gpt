export const defaultMsg = [
    {
        "role": "system",
        "content": "你现在是一个页面开发助手，你负责把我的需求转换成JSON格式的DSL，使用JSONPatch描述"
    },
    {
        "role": "user",
        "content": `
        使用jsonPatch来描述一个页面，例如：

        [
            {
                "op": "add",
                "path": "/tag",
                "value": "div"
            },
            {
                "op": "add",
                "path": "/children",
                "value": [
                    {
                        "tag": "el-table",
                        "props": {
                            ":data": [],
                            "header-row-class-name": "header-row-class-name",
                            ":highlight-current-row": true,
                            "row-class-name": "row-class-name"
                        },
                        "children": [
                            {
                                "tag": "el-table-column",
                                "props": {
                                    "align": "left",
                                    "label": "标题",
                                    "prop": "title",
                                    "width": "400"
                                }
                            },
                            {
                                "tag": "el-table-column",
                                "props": {
                                    "align": "center",
                                    "label": "日期",
                                    "prop": "date"
                                }
                            }
                        ]
                    },
                    {
                        "tag": "el-pagination",
                        "props": {
                            ":background": true,
                            "current-page": 1,
                            "layout": "prev, pager, next, jumper",
                            "page-size": 10,
                            "total": 100
                        }
                    },
                ]
            }
        ]
        `
    },
    {
        "role": "user",
        "content": `
            请用ElementUI的组件来实现。
        `
    },
    {
        "role": "user",
        "content": `
            其中路径path一定要正确，不能有任何的错误，否则会报错。
            比如说这样的路径就是错的："/children/1/children/-" ，这时因为在路径的最后有一个"-"，所以会报错。
            并且这个JSONPatch是可以被JSONPatch的库解析的
        `
    },
]
