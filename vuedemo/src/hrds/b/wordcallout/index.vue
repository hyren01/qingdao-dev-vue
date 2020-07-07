<template>
<div>
    <el-row class="elRows">
        <span>数据标注</span>
        <el-button type="primary" class="els" @click="dialogFormVisibleAdd = true;" size="small">
            <i class="el-icon-circle-plus-outline"></i>新增标注
        </el-button>
    </el-row>
    <div class="lines"></div>

    <el-table :height="tableHeight" stripe :data="systemParameters.filter(data => !search || data.corpus_theme.trim().toLowerCase().includes(search))" border>
        <el-table-column type="index" label="序号" width="62" align="center">
            <template slot-scope="scope">
                <span>{{scope.$index+(currentPage - 1) * pageSize + 1}}</span>
            </template>
        </el-table-column>
        <el-table-column label="语料主题" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
                <el-button type="text" size="mini" @click="corpus(scope.row)">{{scope.row.corpus_theme}}</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="desc" label="描述" align="left" show-overflow-tooltip></el-table-column>
        <el-table-column prop="is_callout" label="已标注/未标注" align="center">
            <template slot-scope="scope">
                <el-tag v-if="scope.row.is_callout=='1'" type="success">已标注</el-tag>
                <el-tag v-else-if="scope.row.is_callout=='0'" type="danger">未标注</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" @keyup.enter.native="searchData" placeholder="语料主题名称搜索">
                </el-input>
            </template>
            <template slot-scope="scope">
                <el-button size="small" type="text" @click="upFormVisibleImport = true;importWordData()">导入语料</el-button>
                <el-button size="small" type="text" style="color:green" @click="dialogFormVisibleUpdate = true;handleEdit(scope.$index, scope.row);">导出语料</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 分页内容 -->
    <el-row class="pagination">
        <el-pagination @current-change="handleCurrentChangeList" :current-page="currentPage" @size-change="handleSizeChange" :page-sizes="[5, 10, 50, 100,500]" :page-size="pageSize" layout=" total,sizes,prev, pager, next,jumper" :total="totalItem"></el-pagination>
    </el-row>
    <!-- 实现点击添加按钮进行页面数添加-->
    <!-- 添加的弹出表单 -->
    <el-dialog title="创建标注主题" :visible.sync="dialogFormVisibleAdd" :before-close="beforeCloseAdd">
        <el-form :model="formAdd" ref="formAdd">
            <el-form-item label="标注主题名称" :label-width="formLabelWidth" prop="corpus_theme" :rules="filter_rules([{required: true}])">
                <el-input v-model="formAdd.para_name" autocomplete="off" placeholder="请输入标注主题名称" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label="上传语料" :label-width="formLabelWidth" prop="para_type" :rules="filter_rules([{required: true}])">
                <el-upload class="upload-demo" ref="upload" :fileList="fileList" action="" :auto-upload="false" :on-change="handleChange">
                    <el-button size="small" type="primary">选择上传文件</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item label="标注描述" :label-width="formLabelWidth" prop="desc" :rules="filter_rules([{required: true}])">
                <el-input type="textarea" v-model="formAdd.para_value" autocomplete="off" placeholder="标注描述" style="width:284px"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleAdd" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="addWordCallout('formAdd')" size="mini">保存</el-button>
        </div>
    </el-dialog>
    <!-- 弹出表单 -->
    <el-dialog title="上传语料" :visible.sync="upFormVisibleImport" width="42%" :before-close="beforeClose">
        <el-form :model="formImport" ref="formImport">
            <el-form-item label="上传语料文件" :label-width="formLabelWidth" prop="file_path" :rules="filter_rules([{required: true}])">
                <el-upload class="upload-demo" ref="upload" accept=".hrds" :fileList="fileList" action="" :auto-upload="false" :on-change="handleChange">
                    <el-button size="small" type="primary">选择上传文件</el-button>
                </el-upload>
                <el-tooltip class="item" effect="dark" content="请选择需要上传的语料文件" placement="right">
                    <i class="fa fa-question-circle " aria-hidden="true"></i>
                </el-tooltip>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleImport" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="upload('formImport')" size="mini">上传</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as validator from "@/utils/js/validator"
import data from "./index"
// 保存当前为第几页
let savecurrentPage;
export default {
    data() {
        return {
            systemParameters: [],
            fileList: [],
            totalItem: data.wordData.length,
            formImport: {},
            search: '',
            currentPage: 1,
            pageSize: 10,
            dialogFormVisibleAdd: false,
            dialogFormVisibleUpdate: false,
            upFormVisibleImport: false,
            // 添加数据与导入源字段
            formAdd: {},
            formUpdate: {},
            formLabelWidth: "150px",
            tableHeight: window.innerHeight - 180,
        }
    },
    created() {
        this.systemParameters = data.wordData
    },
    methods: {
        // 点击添加弹出框的取消按钮
        cancleAdd() {
            // 表单清空
            this.formAdd = {};
            // 隐藏对话框
            this.dialogFormVisibleAdd = false;
            this.dialogFormVisibleUpdate = false;
            this.$refs.formAdd.resetFields();
        },
        // 清空表单验证
        beforeCloseAdd() {
            this.formAdd = {};
            this.dialogFormVisibleAdd = false;
            this.$refs.formAdd.resetFields();
        },
        // 获取表格当前行数据
        handleEdit(index, row) {
            this.para_id = row.para_id;
            this.formUpdate = Object.assign({}, row);
            this.para_name = row.para_name;
        },
        // 关闭弹出框之前触发事件
        beforeClose() {
            this.dialogFormVisibleUpdate = false;

        },
        // 获取数据管理列表数据实现分页功能
        handleCurrentChangeList(val) {
            //把val赋给当前页面
            savecurrentPage = val;
            this.currentPage = wordCallData.length;
        },
        // 改变每页显示条数
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = wordCallData.length;
        },
        // 点击导入弹出框的取消按钮
        cancleImport() {
            this.formImport = {};
            this.upFormVisibleImport = false;
            this.$refs.formImport.resetFields();
        },
        // 获取上传的文件详情
        handleChange(file, fileList) {
            if (fileList.length > 0) {
                this.fileList = [fileList[fileList.length - 1]]
            }
        },
        addWordCallout(formName) {
            this.$refs[formName].validate(valid => {})
        },
        upload(formName) {
            this.$refs[formName].validate(valid => {})
        },
        corpus(row) {
            this.$router.push({
                path: '/cotpus',
                query: {
                    'corpus_theme': this.$Base64.encode(row.corpus_theme),
                    'desc': this.$Base64.encode(row.desc)
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

/* 搜索框样式 */
.systemParameters>>>.el-table th {
    padding: 7px 0;
}
</style>
