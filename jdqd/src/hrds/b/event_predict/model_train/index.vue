<template>
<div class="loindex innerpadd" >
    <el-row class="elRows">
        <span></span>
        <el-button type="primary" class="el1 els" @click="handleCreate()" size="mini">
            <i class="block_icon fa fa-plus-circle"></i>创建模型
        </el-button>
    </el-row>
    <el-table :data="tableData" size="medium" border  style="width: 100%" :height="tableHeight">
        <el-table-column type="index" label="序号" width="70px" align='center'></el-table-column>
        <el-table-column label="模型名称" prop="translated_title" show-overflow-tooltip align='left'>
            <template slot-scope="{ row }">
                <span>{{ row.model_name }}</span>
            </template>
        </el-table-column>
        <el-table-column label="预测天数" prop="event" show-overflow-tooltip align='center'>
            <template slot-scope="{ row }">
                <span>{{ row.days }}</span>
            </template>
        </el-table-column>
        <el-table-column label="创建日期" prop="create_date" show-overflow-tooltip align='center'></el-table-column>
        <el-table-column label="训练完成日期" prop="tran_finish_date" show-overflow-tooltip align='center'></el-table-column>
        <el-table-column label="状态" prop="url" show-overflow-tooltip align='center'>
            <template slot-scope="{ row }">
                <span>
                    {{
                      row.status == "1"
                      ? "训练中"
                      : row.status == "2"
                      ? "已完成"
                      : "已失败"
                    }}
                </span>
            </template>
        </el-table-column>
        <el-table-column label="操作" align='center' width="200">
            <template slot-scope="{ row }">
                <el-button size="mini" type="text" @click="handleEdit(row)" v-if="row.status == '2'">详情</el-button>
                <el-button size="mini" type="text" style="color: red" @click="handleDelete(row)">删除</el-button>
                <el-button size="mini" type="text" @click="handleReturn(row)">重跑</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination background style="float:right" layout="prev, pager, next, sizes, total, jumper" :page-sizes="[5, 10, 15, 20]" :page-size="pagesize" :total="tableData.length" @current-change="handleCurrentChange" @size-change="handleSizeChange" />
</div>
</template>

<script>
import {
    getModelTrainInfo,
    deleteModelInfoById,
    modelReturn
} from "./model_train.js"

export default {
    data() {
        return {
            tableHeight: window.innerHeight - 180,
            screenHeight: window.innerHeight,
            tableData: [],
            dialogFormVisible: false,
            search: "",
            findData: "",
            showEdit: [], // 显示编辑框
            showBtn: [],
            pagesize: 10,
            currpage: 1
        };
    },
    created() {
        this.getData();
        window.onresize = () => {
            return (() => {
                window.screenHeight = window.innerHeight;
                this.screenHeight = window.screenHeight;
            })();
        };
    },
    watch: {
        screenHeight(val) {
            this.screenHeight = val;
            this.tableHeight = this.screenHeight - 180;
        }
    },
    methods: {
        //根据模型编号获取模型训练的信息
        handleEdit(item) {
            this.$router.push({
                name: "nestdetail",
                query: {
                    id: item.model_id
                }
            });
        },
        //创建
        handleCreate() {
            this.$router.push({
                name: "createModel"
            });
        },
        //重跑
        handleReturn(data) {
            this.$confirm("此操作将重跑模型, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(() => {
                    modelReturn({
                            modelId: data.model_id
                        })
                        .then(res => {
                            this.$message({
                                type: "success",
                                message: "重跑成功!"
                            });
                            this.getData();
                        })
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消重跑"
                    });
                });
        },
        // 查看所有数据
        getData() {
            getModelTrainInfo({
                currPage: this.currpage,
                pageSize: this.pagesize
            }).then(res => {
                res.data.data.forEach(item => {
                    item.create_date == undefined ?
                        (item.create_date = "") :
                        (item.create_date = item.create_date + " " + item.create_time);
                    item.tran_finish_date == undefined ?
                        (item.tran_finish_date = "") :
                        (item.tran_finish_date =
                            item.tran_finish_date + " " + item.tran_finish_time);
                });
                this.tableData = res.data.data;
                this.tableData.length = res.data.totalSize;
            })
        },
        handleCurrentChange(cpage) {
            this.currpage = cpage;
            this.getData();
        },
        handleSizeChange(psize) {
            this.pagesize = psize;
            this.getData();
        },
        handleDelete(data) {
            this.$confirm("此操作将永久删除该模型, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(() => {
                    const id = data.model_id;
                    let status = data.status
                    deleteModelInfoById({
                            modelId: id,
                            status: status
                        })
                        .then(res => {
                            this.$message({
                                type: "success",
                                message: "删除成功!"
                            });
                            this.getData();
                        })
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        }
    }
};
</script>

<style scoped>
.lines {
    margin-top: 2px;
    width: 100%;
    min-height: 1px;
    background: #dddddd;
    margin-bottom: 10px;
}

.el1 {
    margin-left: 10px;
}

.els {
    float: right;
    margin-top: 6px;
}

.elRows {
    height: 40px;
    line-height: 40px;
    width: 100%;
}

.el-row span {
    color: #2196f3;
    font-size: 18px;
}

.loindex>>>.el-dialog__body {
    padding: 0px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
}

.loindex .endAgent {
    color: red;
}

.loindex .fa-question-circle {
    margin-left: -5px;
    margin-right: 5px;
}

.loindex .span11 {
    text-align: center;
    margin-bottom: 10px;
}

.loindex .span10 {
    color: #409EFF;
    cursor: pointer;
    margin-top: 30px;
    font-size: 20px;
    margin-bottom: 6px;
    text-align: center;
    margin-bottom: 10px;
}

.loindex .span11 {
    margin-top: 6px;
    font-size: 12px;
    margin-bottom: 10px;
}

.loindex .pDrag {
    display: inline-block;
    height: 40px;
    width: 100%;
    background: #f5f5f5;
    line-height: 40px;
    cursor: pointer;
}

.loindex .movePlace {
    border: 1px solid #ddd;
    margin: 0 10px 20px 10px;
}

.loindex .el-icon-full-screen {
    color: #478fca
}

.loindex .pDrag span:first-child {
    float: left;
    margin-left: 10px;
    font-size: 13px;
    font-weight: normal;
}

.loindex .pDrag span:last-child {
    float: right;
    margin-right: 10px;
}

.loindex .color-item {
    border: 1px solid #ddd;
}

.loindex .span2 {
    text-align: center;
    margin-bottom: 10px;
}

.loindex .span22 {
    text-align: center;
    margin-bottom: 10px;
}

.loindex .span22 {
    font-size: 20px;
}

.loindex .span2 {
    font-size: 12px;
}
.el-pagination{
    margin:14px 0;
}
</style>
<style>
.routerClass {
    margin-top: 4% !important;
}
</style>