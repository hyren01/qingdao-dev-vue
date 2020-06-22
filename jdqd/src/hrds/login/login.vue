<template>
<!-- <div class="login">
    <el-form :model="ruleForm" status-icon :rules="rule" ref="ruleForm" class="demo-ruleForm" label-width="80px">
        <el-form-item label="登录名" prop="user_id" :rules="rule.default">
            <el-input v-model="ruleForm.user_id"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :rules="rule.default">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
  </div>-->
<div id="app">
    <el-row class="elRow">
        <div class="imgDiv">
            <p class="title">人物与事件处理系统</p>
            <el-form :model="ruleForm" status-icon :rules="rule" ref="ruleForm" class="demo-ruleForm">
                <el-form-item prop="user_id" class="userALL" :rules="rule.default">
                    <img src="./login/admin.png" alt="uesrs" class="users" />
                    <el-input v-model="ruleForm.user_id" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item prop="password" class="userALL" :rules="rule.default">
                    <i class="el-icon-lock users"></i>
                    <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码" autocomplete="off" show-password></el-input>
                </el-form-item>
                <div class="divlogin" @click="submitForm('ruleForm')">登录</div>
            </el-form>
        </div>
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

/* 整体垂直居中 */
.elRow {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.imgDiv {
    width: 720px;
    height: 470px;
    background: url("./login/loginInput.png") no-repeat;
    background-position: center;
    background-size: 100% 100%;
}

/* 人物标题样式 */
.title {
    margin-top: 70px;
    font-size: 34px;
    line-height: 34px;
    color: #ffffff;
    text-align: center;
}

/* form表单样式 */
.demo-ruleForm {
    width: 60.2%;
    margin: 0 auto;
    text-align: center;
    margin-top: 7%;
}

/* input框 */
.el-input__inner {
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
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 24px;
    background: #00b4ff;
    color: #ffffff;
    text-align: center;
    cursor: pointer;
    border-radius: 4px;
    margin-top: 9%;
}
</style>
