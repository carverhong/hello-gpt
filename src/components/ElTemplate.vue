<template>
    <el-container>
        <el-header>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                background-color="#16253e" text-color="#fff" active-text-color="#ffd04b">
                <el-image style=" height: 20px" :src="require('../assets/logo_webank.png')"></el-image>
                <el-menu-item index="1">处理中心</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">我的工作台</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                    <el-submenu index="2-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="2-4-1">选项1</el-menu-item>
                        <el-menu-item index="2-4-2">选项2</el-menu-item>
                        <el-menu-item index="2-4-3">选项3</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="3" disabled>消息中心</el-menu-item>
                <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
            </el-menu>
        </el-header>

        <el-container>
            <el-aside width="210px" class="fe-aside">
                <el-menu :default-openeds="['1', '3']" background-color="#283c59" text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-message"></i>导航一</template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-menu"></i>导航二</template>
                        <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="2-1">选项1</el-menu-item>
                            <el-menu-item index="2-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="2-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="2-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="2-4-1">选项4-1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-container>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>页面管理</el-breadcrumb-item>
                        <el-breadcrumb-item>创建页面</el-breadcrumb-item>
                    </el-breadcrumb>
                    <slot></slot>
                </el-main>
            </el-container>
        </el-container>

        <el-footer>Copyright@ 深圳前海微众银行股份有限公司</el-footer>
    </el-container>
</template>
<script>
export default {
    name: 'ElTemplate',
    data() {
        return {
            activeIndex: '1',
            list: [{
                title: '标题1',
                date: '2016-05-02'
            }, {
                title: '标题2',
                date: '2016-05-04'
            }, {
                title: '标题3',
                date: '2016-05-01'
            }, {
                title: '标题4',
                date: '2016-05-03'
            }]
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style>
.el-header {
    padding: 0 !important;
}

.el-menu-demo>.el-submenu {
    float: right !important;
}

.el-menu-demo>.el-menu-item {
    float: right !important;
}

.el-menu-demo>.el-image {
    float: left !important;
    margin: 20px 40px;
}

.el-footer {
    width: 100%;
    background-color: #505050;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
}

.fe-aside {
    background-color: #283c59;
    min-height: 400px;
}
</style>