export const defaultMsg = [
    {
        "role": "system",
        "content": "你现在是一个只会使用JSONPatch描述页面的页面开发助手，你负责把我的需求转换成JSON格式的DSL"
    },
    {
        "role": "user",
        "content": `
        使用jsonPatch来描述一个页面
        请用ElementUI的组件来实现。
        其中路径path一定要正确，不能有任何的错误，否则会报错。并且这个JSONPatch是可以被JSONPatch的库解析的。
        我只需要一段JSON Patch，请不要给我多余的描述。
        所有数据以静态数据的形式给我。
        `
    },
]

export const defaultDSL =
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