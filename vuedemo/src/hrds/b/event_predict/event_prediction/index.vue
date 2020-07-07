<template>
<div class="app-container innerpadd">
    <!-- <el-dialog title="预测" :visible.sync="predictDialogVisible" width="60%">
        <el-button type="warning" @click="forecastBtn()" :loading="loadingbut" style="margin-top:20px;margin-left:25px">事件预测</el-button>
    </el-dialog> -->
    <!-- <el-dialog title="预测结果" :visible.sync="dialogVisible" width="60%">
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false" size="mini">确 定</el-button>
        </span>
        <div class="dayText"> -->
    <!-- <timeline /> -->
    <!-- <chartline /> -->
    <!-- <el-calendar>
          <template slot="dateCell" slot-scope="{ date, data }">
            {{
              data.day
                .split("-")
                .slice(1)
                .join("-")
            }}
            <div v-for="i in dataarr.length" :key="-i">
              <div style="color:blue">
                {{ data.day === dataarr[i - 1] ? detailarr[i - 1] : "" }}
              </div>
              <div style="color:red">
                {{ data.day === dataarr[i - 1] ? eventarr[i - 1] : "" }}
              </div>
            </div>
          </template>
        </el-calendar>-->
    <!-- </div>
    </el-dialog> -->
    <el-row class="elRows">
        <span></span>
        <el-button type="primary" size="mini" class="el1 els" @click="created()"><i class="block_icon fa fa-plus-circle"></i>新建事件预测</el-button>
        <el-button type="success" size="mini" class="el1 els" @click="changePage()"><i class="block_icon fa el-icon-search"></i>线索识别</el-button>
    </el-row>
    <el-table :data="tableData" :height="tableHeight" :default-sort="{ prop: 'para_id', order: 'ascending' }" border>
        <el-table-column label="序号" type="index" width="60" align="center" />
        <el-table-column label="模型名称" prop="name" show-overflow-tooltip>
            <template slot-scope="{ row }">
                <span>{{ row.model_name }}</span>
            </template>
        </el-table-column>
        <el-table-column label="预测天数" width="80" align="center" prop="day">
            <template slot-scope="{ row }">
                <span>{{ row.epoch }}</span>
            </template>
        </el-table-column>
        <el-table-column label="创建日期" prop="create_date" show-overflow-tooltip ></el-table-column>
        <el-table-column label="预测完成日期" prop="task_finish_date" show-overflow-tooltip></el-table-column>
        <el-table-column label="预测数据截至日期" prop="predict_end_date" show-overflow-tooltip></el-table-column>
        <el-table-column label="状态" width="80" align="center" prop="remark">
            <template slot-scope="{ row }">
                <span>
                    {{
            row.status == "1"
            ? "预测中"
            : row.status == "2"
            ? "已完成"
            : "已失败"
            }}
                </span>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
            <template slot-scope="{ row }">
                <el-button type="text" style="color: primary" size="mini" @click="handleEdit(row)">详情</el-button>
                <el-button type="text" style="color: red" size="mini" @click="handleDelete(row)">删除</el-button>
                <el-button type="text" style="color: green" size="mini" @click="rePredict(row)">预测</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination background style="float:right" layout="prev, pager, next, sizes, total, jumper" :page-sizes="[5, 10, 15, 20]" :page-size="pagesize" :total="tableData.length" @current-change="handleCurrentChange" @size-change="handleSizeChange" />
</div>
</template>

<script>
// import timeline from "@/hrds/b/menu2/components/timeline";
import chartline from "@/hrds/b/event_predict/event_prediction/components/chartline"
import * as functionAll from "./index"

export default {
    components: {
        // timeline,
        chartline
    },
    data() {
        return {
            //定时器
            timer: null,
            tableData2: [],
            tableData: [],
            dataarr: [],
            eventarr: [],
            detailarr: [],
            pagesize: 10,
            tableHeight: window.innerHeight - 180,
            screenHeight: window.innerHeight,
            currpage: 1,
            dialogVisible: false,
            predictDialogVisible: false,
            ruleForm: {
                name: "",
                day: "",
                remark: "",
                sample_start_date: "",
                sample_end_date: ""
            },
            loadingbut: false
        };
    },
    created() {
        this.getData();
    },
    mounted() {
        this.timer = setInterval(this.getData, 10000);
        window.onresize = () => {
            return (() => {
                window.screenHeight = window.innerHeight;
                this.screenHeight = window.screenHeight;
            })();
        };
    },
    // 页面销毁时候
    destroyed() {
        clearInterval(this.timer);
        this.timer = null;
    },
    watch: {
        screenHeight(val) {
            this.screenHeight = val;
            this.tableHeight = this.screenHeight - 180;
        }
    },
    methods: {
        //获取模型信息接口
        handleGet() {
            functionAll.handleGet({
                    modelId: item.model_id
                })
                .then(res => {
                    // let data = res.data.data.task_result_content;
                })
                .catch(err => {
                    return false;
                });
        },
        created() {
            this.$router.push({
                name: "NewEvent"
            });
        },
        // 跳转线索识别
        changePage() {
            this.$router.push({
                name: "cuereCognition"
            });
        },
        handleCurrentChange(cpage) {
            this.currpage = cpage;
            this.getData();
        },
        handleSizeChange(psize) {
            this.pagesize = psize;
            this.getData();
        },
        //得到数据方法
        getData() {
            functionAll.indexGetData({
                    currPage: this.currpage,
                    pageSize: this.pagesize
                })
                .then(res => {
                    res.data.data.forEach(item => {
                        item.create_date == undefined ?
                            (item.create_date = "") :
                            (item.create_date = item.create_date + " " + item.create_time);
                        item.task_finish_date == undefined ?
                            (item.task_finish_date = "") :
                            (item.task_finish_date =
                                item.task_finish_date + " " + item.task_finish_time);
                        // if (item.create_date == undefined) {
                        //     item.create_date = '';
                        // } else {
                        //     item.task_finish_date = item.task_finish_date + ' ' + item.task_finish_time;
                        //     item.create_date = item.create_date + ' ' + item.create_time;
                        // }
                    });
                    //console.log(res.data.data.data)
                    this.tableData = res.data.data;
                    this.tableData.length = res.data.totalSize;
                })
                .catch(err => {
                    return false;
                });
        },
        //查看详情方法
        handleEdit(item) {
            if (item.status == "1 ") {
                this.$confirm("该模型正在训练中,无法查看结果", "提示", {
                    type: "warning"
                });
            } else {
                this.$router.push({
                    name: "deTail",
                    query: {
                        taskId: item.task_id
                    }
                });
                functionAll.handleEdit({
                        // taskId: item.model_id
                        taskId: item.task_id
                    })
                    .then(res => {
                        // let data = res.data.data.task_result_content;
                        // let data1 = data.replace(/'/g, '"');
                        // let data2 = JSON.parse(data1)
                        // let obj = data2;
                        // let dataArr = [];
                        // let eventArr = [];
                        // let detailArr = [];
                        // for (var i in obj) {
                        //   dataArr.push(i);
                        //   eventArr.push(obj[i].split("|")[0]);
                        //   detailArr.push(obj[i].split("|")[1]);
                        // }
                        // this.dataarr = dataArr;
                        // this.eventarr = eventArr;
                        // this.detailarr = detailArr;
                        // this.dialogVisible = true;
                    })
                    .catch(err => {
                        return false;
                    });
            }
        },
        handleDelete(data) {
            this.$confirm("此操作将永久删除, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(() => {
                    const id = data.task_id;
                    let status = data.status;
                    functionAll.handleDelete({
                            taskId: id,
                            status: status
                        })
                        .then(res => {
                            console.log(res);
                            this.$message({
                                type: "success",
                                message: "删除成功!"
                            });
                            this.getData();
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        rePredict(data) {
            let id = data.task_id;
            functionAll.rePredict({
                    taskId: id
                })
                .then(res => {
                    this.$message({
                        type: "success",
                        message: "开始预测"
                    });
                    this.getData();
                })
                .catch(err => {
                    console.log(err);
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
    margin-top: 3px;
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
.el-pagination{
    margin:14px 0;
}
</style>
