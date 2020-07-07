<template>
<div class="app-container">
    <el-row class="elRows">
        <span></span>
        <el-button @click="cancel" size="mini" class="el1 els" type="primary">
            返回
        </el-button>
    </el-row>
    <div class="lines"></div>
    <el-row>
        <h4 class="handletitle">预测数据集信息</h4>
        <div class="infoDeatil">
            <div>模型名称：{{ this.model_name}}</div>
            <div>预测天数：{{this.epoch}}</div>
            <div>预测说明：{{ this.task_remark}}</div>
        </div>
    </el-row>
    <h4 class="handletitle">预测结果</h4>
    <div class="detailchart">
        <el-row>
            <!-- <chartline :chartdata="chartdata" /> -->
            <VeLine :data="chartdata" :extend="chartExtend" :settings="chartSettings" />
        </el-row>

        <div class="detailbutton">
            <el-button size="small" type="primary" @click="handleClick">
                查看详情
            </el-button>
        </div>
    </div>
</div>
</template>

<script>
// import chartline from "@/views/nested/menu2/components/chartline";
import VeLine from "v-charts/lib/line.common";
import * as functionAll from "./index.js"
export default {
    components: {
        // chartline
        VeLine
    },
    data() {
        this.chartSettings = {
            xAxisType: "category"
        };
        return {
            chartdata: {
                columns: [],
                rows: []
            },
            chartExtend: {
                series: {
                    type: "line",
                    smooth: false
                }
            },
            start_date: {},
            end_date: {},
            dataArr: [],
            task_remark: "",
            epoch: "",
            model_name: ""
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        cancel() {
            this.$router.go(-1);
        },
        //查看详情
        handleClick() {
            this.$router.push({
                name: "modelDetail",
                query: {
                    forecastDate: this.start_date,
                    taskId: this.$route.query.taskId,
                    dataArr: JSON.stringify(this.dataArr)
                }
            });
        },
        getData() {
            functionAll.detailGetData({
                    // taskId: item.model_id
                    taskId: this.$route.query.taskId
                })
                .then(res => {
                    let testdata = res.data;
                    this.start_date = testdata.start_date;
                    this.end_date = testdata.end_date;
                    this.dataArr = testdata.forecastDateList;
                    this.task_remark = testdata.taskInfo.task_remark
                    this.epoch = testdata.taskInfo.epoch
                    this.model_name = testdata.taskInfo.model_name
                    this.chartdata.columns = ["事件"];
                    testdata.forecastDateList.forEach(item => {
                        this.chartdata.columns.push(item.forecast_date);
                    });
                    let test = testdata.taskList;
                    this.chartdata.rows = [];
                    let dataArr = []; //对数据分组处理过的数组
                    test.map(mapItem => {
                        if (dataArr.length == 0) {
                            dataArr.push({
                                event_name: mapItem.event_name,
                                List: [mapItem]
                            });
                        } else {
                            let res = dataArr.some(item => {
                                //判断相同日期，有就添加到当前项
                                if (item.event_name == mapItem.event_name) {
                                    item.List.push(mapItem);
                                    return true;
                                }
                            });
                            if (!res) {
                                //如果没找相同日期添加一个新对象
                                dataArr.push({
                                    event_name: mapItem.event_name,
                                    List: [mapItem]
                                });
                            }
                        }
                    });
                    let resultArr = [];
                    for (let i = 0; i < dataArr.length; i++) {
                        let obj = {};
                        dataArr[i].List.forEach(item => {
                            obj["事件"] = item.event_name;
                            obj[item.forecast_date] = parseFloat(item.probability);
                        });
                        resultArr.push(obj);
                    }
                    this.chartdata.rows = resultArr;
                })
                .catch(err => {
                    return false;
                });
        }
    }
};
</script>

<style>
.ruzhu-mess .el-form-item__label {
    font-family: Microsoft YaHei !important;
}
</style><style scoped>
.handletitle {
    margin-top: 10px;
    margin-bottom: 20px;
    padding-left: 10px;
    line-height: 20px;
    border-left: 8px solid #3080fe;
    font-weight: 400;
    font-size: 16;
    font-family: Microsoft YaHei;
}

.title {
    margin-top: 20px;
    height: 15vh;
    width: 80vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.title-time {
    font-size: 25px;
}

.detailchart {
    /* border: 1px solid red; */
    position: relative;
    margin-top: 20px;
}

.detailbutton {
    /* border: 1px solid red; */
    position: absolute;
    top: 0%;
    right: 0%;
}

.infoDeatil {
    display: flex;
    flex: 1;
}

.infoDeatil div:first-child {
    margin-right: 100px;
}

.infoDeatil div:nth-child(2) {
    margin-right: 100px;
}

.elBtn {
    margin-bottom: 20px;
}

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
</style>
