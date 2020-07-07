<template>
<div>
    <el-row class="elRows">
        <span>语料详情</span>
        <el-button type="primary" class="els" @click="goBack" size="small">
            <i class="el-icon-back"></i>&nbsp;返回
        </el-button>
    </el-row>
    <div class="lines"></div>
    <div class="demo-image__placeholder">
        <div class="block">
            <span class="demonstration">{{corpus_name}}</span>
            <el-image :src="require(`@/assets/corpusdetail.jpg`)"></el-image>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            corpus_name: '',
            desc: '',
            srcList: [

            ]
        }
    },
    created() {
        this.corpus_name = this.$Base64.decode(this.$route.query.corpus_name)
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
.el-row {
    height: 64px;
    line-height: 64px;
    width: 100%;
}

.searchData {
    margin-bottom: 4px;
}

.elRows {
    width: 100%;
    height: 40px;
    line-height: 40px;
}

.el-icon-coin,
.el-row span {
    color: #2196f3;
    font-size: 18px;
}

.lines {
    margin-top: 4px;
    width: 100%;
    min-height: 1px;
    background: #dddddd;
    margin-bottom: 15px;
}
.els {
    float: right;
    margin-top: 3px;

}
</style>
