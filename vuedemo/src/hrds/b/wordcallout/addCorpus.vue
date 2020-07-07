<template>
<div>
    <el-row class="elRows">
        <span>主题名称: {{corpus_theme}}</span>
        <el-button type="primary" class="els" @click="goBack" size="small">
            <i class="el-icon-back"></i>&nbsp;返回
        </el-button>
    </el-row>
    <div class="lines"></div>
    <el-form :model="formAdd" ref="formAdd">
        <el-row>
            <el-col :span="7">
                <el-form-item label="语料主题名称" prop="corpus_theme" :rules="filter_rules([{required: true}])">
                    <el-input v-model="formAdd.corpus_theme" autocomplete="off" placeholder="语料主题名称" style="width:284px"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="7">
                <el-form-item label="语料标注描述" prop="desc" :rules="filter_rules([{required: true}])">
                    <el-input type="textarea" :autosize="{ minRows: 1.4, maxRows: 4}" v-model="formAdd.desc" autocomplete="off" placeholder="语料标注描述" style="width:280px"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="上传语料" :rules="filter_rules([{required: true}])">
                    <el-upload class="upload-demo" :before-remove="beforeRemove" :on-remove="handleRemove" :fileList="fileList" action :auto-upload="false" :on-change="handleChange">
                        <el-button size="small" type="primary">选择上传文件</el-button>
                    </el-upload>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item>
                    <el-button size="small" type="success" @click="saveCorpus('formAdd')">保 存</el-button>
                </el-form-item>
            </el-col>
        </el-row>
        <template v-if="fileList.length > 0">
            <el-row>
                <el-col>
                    <el-form-item>
                        <el-input type="textarea" autosize v-model="corpusData" autocomplete="off" placeholder="语料标注描述"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </template>
    </el-form>
</div>
</template>

<script>
export default {
    data() {
        return {
            corpus_theme: "",
            formAdd: {},
            fileList: [],
            corpusData: '据吉林省内的旅游当局有关人士称，到目前为止中断的冬季旅游也将在今年继续进行。 11月访问北韩的朝鲜族俄罗斯人回顾说，在连接开城和平壤的高速公路休息处，看到中国游客的大型观光巴士停了10辆以上，吓了一跳。 。 路透社报道，19年访朝的中国游客达35万人。 过去曾通过过的道朝鲜中央通信22日召开了朝鲜劳动党中央军事委员会扩大会议，联合国就加强“自卫性国防力量”的问题进行了讨论，22日，联合国规定会员国有义务将在本国工作的朝鲜劳动者送回联合国。 朝鲜虽然又失去了一种获取外汇的手段，但却看不到缓和军事挑衅的迹象。 在以解除制裁为目标的美朝会谈陷入僵局的情况下，为什么能够继续采取强硬态度呢？。 其背景是与以美朝对话为杠杆恢复的中国之间的蜜月关系。 （符拉迪沃斯托克编辑委员牧野爱博，沈阳平井良和，首尔神谷毅）工人遣返期限前夕的20日上午，在与平壤直达的俄罗斯远东符拉迪沃斯托克机场，抱着巨大行李的近100名北韩工人正在等待出国。 。 俄国人黑市商人向工人打招呼，收了皱巴巴的卢布牌，就换一美元，五美元的牌。 曾经自己也作为劳动者被派遣到俄罗斯，就那样逃北的男性（57岁）说:“人们想把在俄罗斯得到的东西全部带回去，行李就会增加。 。 朝鲜几乎不能使用卢布，现金也要换成美元带回去。 “。 问了一下在机场的工人们，他们一边在意着周围的情况，一边简短地回答说“时隔5年回来了”，“在建设劳动中工作了”，“生活无论在哪里都很辛苦”。 对于再次访问俄罗斯的可能性，全体人员都嘟囔着“不知道”。 。 据朝鲜国营高丽航空报道……'
        };
    },
    created() {
        this.corpus_theme = this.$Base64.decode(this.$route.query.corpus_theme);
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        // 获取上传的文件详情
        handleChange(file, fileList) {
            console.log(file);

            if (fileList.length > 0) {
                this.fileList = [fileList[fileList.length - 1]]
            }
            console.log(fileList);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        handleRemove(file, fileList) {
            this.fileList.splice(file, 1)
        },
        saveCorpus(formName) {
            this.$refs[formName].validate(valid => {})
        }
    }
};
</script>

<style scoped>
.el-row {
    height: 64px;
    line-height: 64px;
    width: 100%;
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

/* button样式设置 */
.els {
    float: right;
    margin-top: 3px;
}
</style>
