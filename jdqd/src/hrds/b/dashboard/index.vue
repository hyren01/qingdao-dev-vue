<template>
<div id="dashboard1">
    <el-row class="elRow">
        <div class="dashboardImgDiv">
            <el-col :span="6">
                <div class="elcol6">
                    <img src="./index/sao.png" alt="sao" />
                    <h2>事件识别</h2>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="elcol6">
                    <img src="./index/yuce.png" alt="yuce" />
                    <h2>事件预测</h2>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="elcol6">
                    <img src="./index/tu.png" alt="tu" />
                    <h2>事理图谱</h2>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="elcol6">
                    <img src="./index/pvp.png" alt="pvp" />
                    <h2>人员共现</h2>
                </div>
            </el-col>
        </div>
    </el-row>
</div>
</template>

<style scoped>
/* 总体样式和背景图和整体垂直居中*/
#dashboard1 {
    margin: 0;
    padding: 0;
    background: url("./index/index.png") no-repeat;
    background-position: center;
    background-size: cover;
    overflow: hidden;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 高宽自适应 */
.elRow {
    width: 100%;
}

/* 水平居中 */
.dashboardImgDiv {
    text-align: center;
}

/* 小图部分 */
.elcol6 {
    width: 200px;
    height: 280px;
    margin: 0 auto;
    background-color: #000438;
    border-radius: 6px;
    border: 1px solid #324a70;
    box-shadow: 6px 6px 6px #061028;
}

/* 引入图片设置 */
.elcol6 img {
    width: 60px;
    height: 60px;
    margin-top: 62px;
}

/* 标题信息 */
.elcol6 h2 {
    margin-top: 44px;
    color: #009dd7;
}

/* 划过时缩放 */
.elcol6:hover {
    box-shadow: 6px 6px 6px #061028;
    font-size: 22px;
    transition: all 1s;
    -ms-transition: all 1s;
    /* IE 9 */
    -moz-transition: all 1s;
    /* Firefox */
    -webkit-transition: all 1s;
    /* Safari 和 Chrome */
    -o-transition: all 1s;
    /* Opera */
    cursor: pointer;
    transform: scale(1.1, 1.1);
    -ms-transform: scale(1.1, 1.1);
    /* IE 9 */
    -moz-transform: scale(1.1, 1.1);
    /* Firefox */
    -webkit-transform: scale(1.1, 1.1);
    /* Safari 和 Chrome */
    -o-transform: scale(1.1, 1.1);
    /* Opera */
}
</style>
