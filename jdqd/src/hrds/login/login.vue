<template>
<div id="app" class = "app">
    <el-row class="elRow">
        <el-col :span="spanNumber" class="elcol8">
            <div class="imgDiv">
                <p :class="titles">人物与事件处理系统</p>
                <el-form :model="ruleForm" status-icon :rules="rule" ref="ruleForm" :class="ruleFormclass">
                    <el-form-item prop="user_id" class="userALL" :rules="rule.default">
                        <img src="./login/admin.png" alt="uesrs" class="users" />
                        <el-input v-model="ruleForm.user_id" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" class="userALL" :rules="rule.default">
                        <i class="el-icon-lock users"></i>
                        <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码" autocomplete="off" show-password></el-input>
                    </el-form-item>
                </el-form>
                <div :class="divloginBton" @click="submitForm('ruleForm')">登录</div>
            </div>
        </el-col>

    </el-row>
</div>
</template>

<script>
import {
    mapActions
} from "vuex";
import * as addTaskAllFun from "./login";
import * as validator from "@/utils/js/validator";
export default {
    name: "Login",
    mounted() {
        this.differentScreen();
        // 绑定enter事件
        this.enterKeyup();
        sessionStorage.setItem("flag", "1");
    },
    destroyed() {
        // 销毁enter事件
        this.enterKeyupDestroyed();
    },
    data() {
        return {
            link: "",
            ruleForm: {
                user_id: "",
                password: ""
            },
            spanNumber: 9,
            titles: 'title',
            ruleFormclass: 'demo-ruleForm',
            divloginBton: 'divlogin',
            rule: validator.default,
            formLabelWidth: "60px"
        };
    },
    methods: {
        ...mapActions(["login"]),
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    //这里项目正式使用时,请根据用户登陆验证的方式自行修改到默认页面
                    this.login(this.ruleForm).then(res => {
                        sessionStorage.setItem("userId", this.ruleForm.user_id);
                        addTaskAllFun.getDefaultPage().then(res => {
                            this.$router.push(res.data);
                        });
                    });
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        enterKey(event) {
            const componentName = this.$options.name;
            const code = event.keyCode ?
                event.keyCode :
                event.which ?
                event.which :
                event.charCode;
            if (componentName == "Login" && code === 13) {
                this.submitForm("ruleForm");
            }
        },
        enterKeyupDestroyed() {
            document.removeEventListener("keyup", this.enterKey);
        },
        enterKeyup() {
            document.addEventListener("keyup", this.enterKey);
        },
        // 兼容分辨率
        differentScreen() {
            if (screen.width < 1600) {
                this.spanNumber = 9;
                this.titles = 'title1366';
                this.ruleFormclass = 'demo-ruleForm1366';
                this.divloginBton = 'divlogin1366';
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* 总体样式和背景图 */
html,
body {
    width: 100%;
    height: 100%;
}

body {
    margin: 0;
    padding: 0;
    background: url("./login/login.png") no-repeat;
    background-position: center;
    background-size: cover;
    overflow: hidden;
}
</style>
<style scoped>
/* 整体垂直居中 */
.elRow {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 三种css兼容 */
/* 默认1920 */
.elcol8 {
    background: url("./login/loginInput.png") no-repeat;
    background-position: center;
    background-size: 100% 100%;
}

.imgDiv {
    width: 100%;
}

/* 人物标题样式 */
.title {
    margin: 60px 0 30px 0;
    font-size: 34px;
    line-height: 34px;
    color: #ffffff;
    text-align: center;
}

/* form表单样式 */
.demo-ruleForm {
    width: 64.2%;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 30px;
}

/* input框 */
.app >>>.el-input__inner {
    background-color: transparent !important;
    border: 1px solid #03456b !important;
    color: #ffffff !important;
    padding-left: 8.4%;
}

/* input框图 */
.userALL {
    position: relative;
}

.users {
    display: inline-block;
    width: 12px;
    height: 12px;
    position: absolute;
    left: 3%;
    top: 36%;
    z-index: 10000;
    color: #ffffff;
}

/* 登录按钮样式 */
.divlogin {
    width: 64.2%;
    margin: 0 auto;
    height: 44px;
    line-height: 44px;
    font-size: 24px;
    background: #00b4ff;
    color: #ffffff;
    text-align: center;
    cursor: pointer;
    border-radius: 4px;
    margin-top: 10px;
    margin-bottom: 100px;
}

/* 分辨率1366及以下 */
/* 人物标题样式 */
.title1366 {
    margin: 40px 0 20px 0;
    font-size: 24px;
    line-height: 24px;
    color: #ffffff;
    text-align: center;
}

/* form表单样式 */
.demo-ruleForm1366 {
    width: 64.2%;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 20px;
}

/* 登录按钮样式 */
.divlogin1366 {
    width: 64.2%;
    margin: 0 auto;
    height: 36px;
    line-height: 36px;
    font-size: 16px;
    background: #00b4ff;
    color: #ffffff;
    text-align: center;
    cursor: pointer;
    border-radius: 4px;
    margin-bottom: 60px;
}
</style>
