<template>
<div>
    <el-row class="elRows">
        <span>主题名称: {{theme}}</span>
        <!-- <el-button type="primary" class="els" @click="dialogFormVisibleAdd" size="small">
            <i class="el-icon-circle-plus-outline"></i>&nbsp;新增语料标注
        </el-button> -->
    </el-row>
    <div class="lines"></div>

    <el-table :height="tableHeight" stripe :data="cotpusData.filter(data => !search || data.corpus_name.trim().toLowerCase().includes(search))" border>
        <el-table-column type="index" label="序号" width="62" align="center">
            <template slot-scope="scope">
                <span>{{scope.$index+(currentPage - 1) * pageSize + 1}}</span>
            </template>
        </el-table-column>
        <el-table-column label="语料主题" align="left" prop="corpus_name" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="desc" label="描述" align="left" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" align="center">
            <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" @keyup.enter.native="searchData" placeholder="语料主题名称搜索">
                </el-input>
            </template>
            <template slot-scope="scope">
                <el-button size="small" type="text" @click="corpusdetails(scope.row)">新增语料标注</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页内容 -->
    <el-row class="pagination">
        <el-pagination @current-change="handleCurrentChangeList" :current-page="currentPage" @size-change="handleSizeChange" :page-sizes="[5, 10, 50, 100,500]" :page-size="pageSize" layout=" total,sizes,prev, pager, next,jumper" :total="totalItem"></el-pagination>
    </el-row>
    <!-- 添加的弹出表单 -->
    <!-- <el-dialog title="创建标注主题" :visible.sync="dialogFormVisibleAdd" :before-close="beforeCloseAdd">
        <el-form :model="formAdd" ref="formAdd">
            <el-form-item label="标注主题名称" :label-width="formLabelWidth" prop="corpus_theme" :rules="filter_rules([{required: true}])">
                <el-input v-model="formAdd.corpus_theme" readonly autocomplete="off" placeholder="请输入标注主题名称" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label="上传语料" :label-width="formLabelWidth" prop="para_type" :rules="filter_rules([{required: true}])">
                <el-upload class="upload-demo" ref="upload" :fileList="fileList" action="" :auto-upload="false" :on-change="handleChange">
                    <el-button size="small" type="primary">选择上传文件</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item label="标注描述" :label-width="formLabelWidth" prop="desc" :rules="filter_rules([{required: true}])">
                <el-input type="textarea" readonly v-model="formAdd.desc" autocomplete="off" placeholder="标注描述" style="width:284px"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleAdd" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="addWordCallout('formAdd')" size="mini">保存</el-button>
        </div>
    </el-dialog> -->
</div>
</template>

<script>
import * as validator from "@/utils/js/validator"
import wordCallData from "./index"
// 保存当前为第几页
let savecurrentPage;
export default {
    data() {
        return {
            cotpusData: null,
            currentPage: 1,
            pageSize: 10,
            totalItem: wordCallData.cotpusData.length,
            // dialogFormVisibleAdd: false,
            theme: '',
            search: '',
            tableHeight: window.innerHeight - 180,
            formLabelWidth: '150px',
            formAdd: {},
            fileList: [],
        }
    },
    created() {

        this.cotpusData = wordCallData.cotpusData
        this.theme = this.$Base64.decode(this.$route.query.corpus_theme)
        this.formAdd.corpus_theme = this.theme
        this.formAdd.desc = this.$Base64.decode(this.$route.query.desc)
    },
    methods: {
        // 改变每页显示条数
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = wordCallData.length;
        },
        // 获取数据管理列表数据实现分页功能
        handleCurrentChangeList(val) {
            //把val赋给当前页面
            savecurrentPage = val;
            this.currentPage = wordCallData.length;
        },
        // 获取上传的文件详情
        handleChange(file, fileList) {
            if (fileList.length > 0) {
                this.fileList = [fileList[fileList.length - 1]]
            }
        },
        corpusdetails(row) {
            this.$router.push({
                path: '/corpusdetails',
                query: {
                    'corpus_name': this.$Base64.encode(row.corpus_name),
                    'desc': this.$Base64.encode(row.desc)
                }
            })
        },
        dialogFormVisibleAdd(){
            this.$router.push({
                path: '/addCorpus',
                query: {
                    'corpus_theme': this.$route.query.corpus_theme,
                }
            })
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

/* button样式设置 */
.els {
    float: right;
    margin-top: 3px;

}

.el1 {
    margin-left: 10px;
}

.item {
    float: right;
}

.upload-demo {
    float: left;
}

.fa-question-circle {
    margin-top: 12px;
}

.searchBtn:hover {
    background-color: #409EFF;
    color: #FFF;
}

/* 分页 */
.pagination {
    margin-top: 20px;
    width: 100%;
}

.el-pagination {
    float: right;
}
</style>
