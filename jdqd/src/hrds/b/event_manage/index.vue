<template>
<div class="loindex innerpadd">
    <el-row class="elRows">
        <span></span>
        <el-button type="primary" class="el1 els" @click="addWord" size="mini">
            <i class="block_icon fa fa-plus-circle"></i>新增同义词
        </el-button>
    </el-row>
    <div>
        <el-table size="medium" :data="tableData.slice((this.currpage - 1) * this.pagesize,
          this.currpage * this.pagesize)" border  style="width: 100%" :height="tableHeight">
            <el-table-column type="index" label="序号" width="70px" align='center'></el-table-column>
            <el-table-column label="主语" prop="translated_title" show-overflow-tooltip align='center'>
                <template slot-scope="{ row }">
                    <span>{{ row.event_zy }}</span>
                </template>
            </el-table-column>
            <el-table-column label="谓语" prop="event" show-overflow-tooltip align='center'>
                <template slot-scope="{ row }">
                    <span>{{ row.event_wy }}</span>
                </template>
            </el-table-column>
            <el-table-column label="宾语" prop="source" show-overflow-tooltip align='center'>
                <template slot-scope="{ row }">
                    <span>{{ row.event_by }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建日期" prop="remark" show-overflow-tooltip align='center'>
                <template slot-scope="{ row }">
                    <span>{{ row.create_date }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" prop="source" align='center' width="200">
                <template slot-scope="{ row }">
                    <el-button size="mini" type="text" @click="handleEdit(row)">详情</el-button>
                    <el-button size="mini" type="text" style="color: red;" @click="handleDelete(row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background class="pagination" style="float:right;" layout="prev, pager, next, sizes, total, jumper" :page-sizes="[5, 10, 15, 20]" :page-size="pagesize" :total="this.length" @current-change="handleCurrentChange" @size-change="handleSizeChange" />
    </div>

    <el-dialog :title="titleType" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" :label-position="labelPosition">
            <el-row type="flex" justify="left">
                <el-col>
                    <el-form-item label="主语">
                        <el-col style="width:95%">
                            <el-input v-model="form.zy" size="medium"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item label="主语同义词">
                        <el-col style="margin-left:1%">
                            <el-input v-model="form.Zys" size="medium"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="left">
                <el-col>
                    <el-form-item label="谓语">
                        <el-col style="width:95%">
                            <el-input v-model="form.wy" size="medium"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item label="谓语同义词">
                        <el-col style="margin-left:1%">
                            <el-input v-model="form.Wys" size="medium"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="left">
                <el-col>
                    <el-form-item label="宾语">
                        <el-col style="width:95%">
                            <el-input v-model="form.by" size="medium"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item label="宾语同义词">
                        <el-col style="margin-left:1%">
                            <el-input v-model="form.Bys" size="medium"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer" style="margin-top:-5%">
            <el-button @click="dialogFormVisible = false" class="el1 els" size="mini">取 消</el-button>
            <el-button type="primary" @click="onSubmit" class="el1 els" size="mini" v-if="isSave">保 存</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import { queryTableTeventalls, addToTableTeventall, deleteTableTeventall, queryTableTeventall } 
from "./event_manage.js"

export default {
    data() {
        return {
            labelPosition: "left",
            dialogFormVisible: false,
            isSave: true,
            formLabelWidth: '120px',
            titleType: "",
            form: {
                zy: "",
                wy: "",
                by: "",
                Zys: "",
                Wys: "",
                Bys: "",
                type: [],
                neuron: "",
                epoch: ""
            },
            tableHeight: window.innerHeight - 180,
            screenHeight: window.innerHeight,
            tableData: [],
            pagesize: 10,
            currpage: 1,
            length: 0,
        };
    },
    created() {
        this.initData()
    },
    methods: {
        initData() {
            queryTableTeventalls().then(res => {
                    this.tableData = [...res.data];
                    this.length = this.tableData.length;
            }),
            window.onresize = () => {
                return (() => {
                    window.screenHeight = window.innerHeight;
                    this.screenHeight = window.screenHeight;
                })();
            }
        },
        addWord() {
            this.form.zy = "";
            this.form.wy = "";
            this.form.by = "";
            this.form.Zys = "";
            this.form.Wys = "";
            this.form.Bys = "";
            this.titleType = "新增同义词"
            this.dialogFormVisible = true
            this.isSave = true
        },
        onSubmit() {
            addToTableTeventall({
                eventZy: this.form.zy,
                eventWy: this.form.wy,
                eventBy: this.form.by,
                eventZys: this.form.Zys,
                eventWys: this.form.Wys,
                eventBys: this.form.Bys
            }).then(res => {
                this.dialogFormVisible = false
                this.initData()
            })
        },
        handleCurrentChange(cpage) {
            this.currpage = cpage;
        },
        handleSizeChange(psize) {
            this.pagesize = psize;
        },
        handleDelete(data) {
            this.$confirm("是否确认删除?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
            })
            .then(() => {
                const id = data.solr_event_id;
                deleteTableTeventall({
                        solrEventId: id
                })
                .then(res => {
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                    queryTableTeventalls().then(res => {
                        this.tableData = [...res.data];
                        this.length = this.tableData.length;
                    })
                })
            })
            .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除"
                });
            });
        },
        handleEdit(data) {
            queryTableTeventall({
                    solrEventId: data.solr_event_id
            }).then(res => {
                let data = res.data;
                this.form.zy = data.event_zy;
                this.form.wy = data.event_wy;
                this.form.by = data.event_by;
                this.form.Zys = data.event_zy_s;
                this.form.Wys = data.event_wy_s;
                this.form.Bys = data.event_by_s;
                this.titleType = "同义词详情"
                this.isSave = false
                this.dialogFormVisible = true
            })
        }
    },
    watch: {
        screenHeight(val) {
            this.screenHeight = val;
            this.tableHeight = this.screenHeight - 180;
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
    margin-top: 3px;
}

.elRows {
     margin: 0 0 10px 0;
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

.pagination {
    margin-right: calc(100px - 30px);
}
</style>
