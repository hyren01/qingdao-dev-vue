<template>
<div class="home">
    <el-container style="height:100%">
        <el-aside :class="isCollapse==true?'aside1':'aside2'" style="position: fixed;left: 0;top: 0;">
            <happy-scroll color="rgba(204, 200, 200, 0.6)" size="5" resize>
                <!-- 导航 -->
                <el-menu :unique-opened='true' style="border:0" background-color="#15215c" text-color="#fff" active-text-color="#009dd7" @select="handleSelect" :collapse-transition="true" :collapse="isCollapse" class="el-menu-vertical-demo">
                    <div v-for="items in menus" :key="items.name">
                        <template v-if="items.children">
                            <!--二级菜单循环-->
                            <el-submenu :index="items.children[0].path" class='oneMenu'>
                                <template slot="title"><i :class="items.icon"></i><span slot="title" class='displayno' v-if="isCollapse==false">{{items.title}}</span></template>
                                <el-menu-item v-for="item in items.children" :key="item.name" :index="item.path">
                                    <i :class="item.icon" class='displayno'></i>
                                    <span class='displayno'>{{item.title}}</span>
                                </el-menu-item>
                            </el-submenu>
                        </template>
                        <template v-else>
                            <!--一级菜单循环-->
                            <el-menu-item :index="items.path" :class="isCollapse==true?'asideW2':'asideW1'">
                                <i :class="items.icon"></i>
                                <span slot="title" class='displayno'>{{items.title}}</span>
                            </el-menu-item>
                        </template>
                    </div>
                </el-menu>
            </happy-scroll>
        </el-aside>
        <el-container :class="isCollapse==true?'asidewidth1':'asidewidth2'">
            <el-header v-if="routerName == '/dashboard'" style="cursor: pointer;background-color: #15215c" :class="isCollapse==true?'header2':'header1'">
                <el-col :span="18" style='text-align:left;line-height: 45px;'>
                    <span @click="meanClickFun()" style="color:#409EFF"><i :class="isCollapse==true?'el-icon-s-unfold':'el-icon-s-fold'" style="font-size:22px;margin-right:12px;"></i></span>
                    <el-breadcrumb separator="/" style="display: inline-block;color:#409EFF;">
                        <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">
                            <router-link v-if="item.url" :to="item.url">{{item.name}}</router-link>
                            <a v-else>
                                {{item.name}}
                            </a>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
                <el-col :span="6" style='text-align: right;position: fixed;right: 20px;top: -2px;'>
                    <el-link :underline="false" @click="goback"><i class="el-icon-s-custom" style="color:#409EFF;font-size:16px">&nbsp;&nbsp;退出登录</i></el-link>
                </el-col>
            </el-header>
            <el-header v-else style="background-color:#fff" :class="isCollapse==true?'header2':'header1'">
                <el-col :span="18" style='text-align:left;line-height: 45px;'>
                    <span @click="meanClickFun()" style="cursor: pointer;color:#409EFF"><i :class="isCollapse==true?'el-icon-s-unfold':'el-icon-s-fold'" style="font-size:22px;margin-right:12px;"></i></span>
                    <el-breadcrumb separator="/" style="display: inline-block;color:#409EFF;">
                        <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">
                            <router-link v-if="item.url" :to="item.url">{{item.name}}</router-link>
                            <a v-else>
                                {{item.name}}
                            </a>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
                <el-col :span="6" style='text-align: right;position: fixed;right: 20px;top: -2px;'>
                    <el-link :underline="false" @click="goback"><i class="el-icon-s-custom" style="color:#409EFF;font-size:16px">&nbsp;&nbsp;退出登录</i></el-link>
                </el-col>
            </el-header>
            <!-- <div style='height:45px;clear:both;'></div> -->
            <el-main style="margin-top:45px">
                <router-view class="routerView"></router-view>
            </el-main>
        </el-container>
    </el-container>
</div>
</template>

<script>
import {
    mapActions
} from 'vuex'
import Scrollbar from '../scrollbar';

import * as addTaskAllFun from './menu'
import childrenMenus from './childrenMenus'
export default {
    components: {
        Scrollbar,
    },
    data() {
        return {
            menus: [],
            deflink: '',
            isCollapse: true,
            routerName: ''
        }
    },
    mounted() {
        this.routerName = this.$route.path;
        // 这里是菜单默认路径
        // this.$router.push('syspara');
        addTaskAllFun.getMenu().then(res => {
            let data = res.data;
            let arr = []
            for (var i = 0; i < data.length; i++) {
                let user_type = data[i].user_type;
                let children = {
                    'icon': data[i].menu_remark,
                    'title': data[i].menu_name,
                    'path': data[i].menu_path
                }
                if (typeof childrenMenus[user_type] != 'undefined') {
                    children['children'] = childrenMenus[user_type]
                }
                arr.push(children)
            }
            this.menus = JSON.parse(JSON.stringify(arr));
            // this.deflink = this.menus[0]?this.menus[0].path:''

        })
        addTaskAllFun.getDefaultPage().then(res => {
            this.deflink = res.data;
        });

    },
    methods: {
        ...mapActions(['resetToken']),
        goback() {
            this.resetToken();
            this.$router.push('/');
        },
        meanClickFun() {
            this.isCollapse = !this.isCollapse
            if (this.isCollapse == true) {
                let arr = document.getElementsByClassName('displayno')
                for (let i = 0; i < arr.length; i++) {
                    arr[i].style.display = 'none'
                }
            } else {
                let arr = document.getElementsByClassName('displayno')
                for (let i = 0; i < arr.length; i++) {
                    arr[i].style.display = 'block'
                }
            }
        },
        //导航栏路由跳转
        handleSelect(key, keyPath, title) {
            this.routerName = key
            this.$router.push({
                path: key
            });
        }

    }
}
</script>

<style scoped>
.happy-scroll-container {
    height: 100% !important;
}

.aside2 {
    background-color: #15215c;
    /* min-height: 89.1vh; */
    width: 200px !important;
    transition: 0.5s;
    height: 100%;
}

.aside1 {
    background-color: #15215c;
    /* min-height: 89.1vh; */
    width: 50px !important;
    transition: 0.5s;
    height: 100%;
}

.routerView {
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 10px;
}

.asidewidth2 {
    margin-left: 200px;
    transition: 0.5s;
}

.asideW1 {
    width: 200px;
    transition: 0.2s;
}

.asideW2 {
    width: 50px;
    transition: 0.2s;
}

.asidewidth1 {
    margin-left: 50px;
    transition: 0.5s;
}

.header1 {
    position: fixed !important;
    left: 200px !important;
    top: 0 !important;
    transition: 0.5s;
}

.header2 {
    margin-top: 0;
    margin-left: 0;
    position: fixed !important;
    left: 50px !important;
    top: 0 !important;
    transition: 0.5s;
}

.leftmean>>>.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-header {
    text-align: center;
    color: #000;
    /* position: fixed; */
    /* top: 0%; */
    width: 100%;
    z-index: 10;
    /* left: 0; */
    height: 45px !important;
    line-height: 45px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    margin-bottom: 10px;
}

.el-main {
    padding: 0px 0px;
    /* margin-top: 4% !important; */
    height: 92.2vh;
    background: #fff;
}

.el-container {
    height: 100vh;
}

.home>>>.happy-scroll-container {
    overflow: visible;
}

.el-footer {
    height: 30px !important;
    line-height: 30px;
    font-size: 12px;
    position: fixed;
    bottom: 0%;
    width: 100%;
    z-index: 10;
    background-color: #15215c;
    text-align: center;
    color: #fff;
}

li {
    background-color: #15215c !important;
}

.home>>>.el-menu--collapse>div>.el-menu-item .el-submenu__icon-arrow,
.home>>>.el-menu--collapse>div>.el-submenu>.el-submenu__title .el-submenu__icon-arrow {
    display: none;
}

.home>>>.el-menu--collapse {
    width: 50px;
}

.home>>>.el-tooltip,
.home>>>.el-submenu__title,
.home>>>.el-menu>div>.el-menu-item {
    padding: 0 10px !important;
}
</style>
