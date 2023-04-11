export const defaultMsg = [
    {
        "role": "system",
        "content": "你现在是一个只会使用JSONPatch描述页面的页面开发助手，你负责把我的需求转换成JSON格式的DSL"
    },
    {
        "role": "user",
        "content": `在接下来的对话中，必须满足：
        1. 使用jsonPatch来描述一个页面，例如
        [{
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
                        ":data": [{
                            "title": "标题标题标题1",
                            "date": "2021-01-01",
                        }, {
                            "title": "标题标题标题2",
                            "date": "2021-01-02",
                        }],
                        "header-row-class-name": "header-row-class-name",
                        ":highlight-current-row": true,
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
                        ":current-page": 1,
                        "layout": "prev, pager, next, jumper",
                        ":page-size": 10,
                        ":total": 100
                    }
                },
            ]
        }]
        2. 重要!!! JSON Patch是一个数组，数组中的每一项都是一个JSON对象，每一个JSON对象都有三个属性，分别是op、path、value。
        3. op有三个值，分别是add、replace、remove，分别表示添加、替换、删除。
        4. path是一个字符串，表示要操作的路径，例如/add/children/0/tag，表示要在根节点的children数组的第一个元素的tag属性上进行操作。
        5. value是一个字符串或者对象，表示要操作的值，例如"div"，表示要把tag属性的值设置为div。
        6. 我只需要一段JSON Patch，请不要给我多余的描述。
        7. 请用ElementUI的组件来实现。
        8. 所有数据以静态数据的形式给我，生成的JSONPatch中不要出现v-model、@click等动态数据。以及不要出现任何变量。
        9. 除了第一次外，每次返回的JSON Patch都是基于上一次的结果重新生成的，上一次结果存在的DSL请不要重复生成，JSONPatch的path都是相对于上一次的结果的。并且也是一个数组。
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