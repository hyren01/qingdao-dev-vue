<template>
<div class="app-container">
    <el-row class="elRows">
        <el-button @click="cancel" size="mini" class="el1 els" type="primary">
            返回
        </el-button>
    </el-row>
    <div class="lines"></div>
    <div class="left">
        <h4 class="handletitle">
            历史详情<br/>
            <span style="float:right;margin-bottom:10px;">
                时间筛选:
                <el-date-picker v-model="value" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="selectDate"></el-date-picker>
            </span>
        </h4>
        <span>
                模型名称:{{this.modelName}}
        </span>
        <el-table :data="modeltable" :cell-class-name="tableRowClass" border>
            <el-table-column label="时间" prop="event_name"></el-table-column>
            <el-table-column v-for="(item, index) in modeltable[1].data" :key="item.forecast_date">
                <template slot="header">{{item.forecast_date}}</template>
                <template slot-scope="scope">
                    <span v-if="scope.row.data[index].probability==''"></span>
                    <span :class="arry.indexOf(scope.row.data[index].event_name) != -1 ? 'spanstyle' : ''" v-else>{{scope.row.data[index].event_name}}({{scope.row.data[index].probability}})</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="textDiv">
            <span>*绿色表示：真实事件；黄色表示：在模型评估中存在的事件</span>
        </div>
    </div>
</div>
</template>

<script>
import * as functionAll from "./index"
export default {
    data() {
        return {
            modeltable: [],
            value: "",
            dataList: {},
            arry: [],
            widths: "",
            modelName:""
        };
    },
    computed: {},
    mounted() {
        this.modelName=this.$route.query.modelName
        this.getHistoryInfo(
            this.$route.query.forecastDate,
            this.getAfterDate(this.$route.query.forecastDate)
        );
        this.showDate(this.$route.query.forecastDate);
    },
    methods: {
        cancel() {
            this.$router.go(-1);
        },
        // 显示筛选日期
        showDate(val) {
            let arr = [];
            arr[0] = val.replace(/\-/g, "/");
            arr[1] = this.getAfterDate(val).replace(/\-/g, "/");
            this.value = arr;
        },
        // 获取历史记录信息
        getHistoryInfo(valBfore, valAfter) {
            functionAll.historyDetailGetHistoryInfo({
                    taskId: this.$route.query.taskId,
                    detailId: this.$route.query.detailId,
                    forecastStartDate: valBfore,
                    forecastEndDate: valAfter
                })
                .then(res => {
                    // 返回值处理
                    if (res.data.list.length == 0) {
                        this.modeltable = [];
                        this.modeltablehead = [];
                        this.widths = 100 + "%";
                    } else if (res.data.list.length > 0) {
                        this.widths = 140;
                        this.modeltable = res.data.list;
                        const detailList = res.data.detailList;
                        this.arry = detailList;
                    }
                });
        },
        // 表格行颜色
        tableRowClass({
            row,
            rowIndex,
            column,
            columnIndex
        }) {
            if (rowIndex == 0) {
                console.log(1)
                return "background";
            }
        },
        //得到前七天的日期
        getAfterDate(listdata) {
            //n为你要传入的参数，当前为0，前一天为-1，后一天为1
            let date = new Date(listdata);
            let year, month, day, AfterDate;
            date.setDate(date.getDate() + 6);
            year = date.getFullYear();
            month = date.getMonth() + 1;
            day = date.getDate();
            AfterDate =
                year +
                "-" +
                (month < 10 ? "0" + month : month) +
                "-" +
                (day < 10 ? "0" + day : day);
            return AfterDate;
        },
        // 日期区间选择数据
        selectDate(val) {

            function changeData(num) {
                return num > 9 ? num + "" : "0" + num;
            }
            if (val != null) {
                let beforeDate =
                    val[0].getFullYear() +
                    "-" +
                    changeData(val[0].getMonth() + 1) +
                    "-" +
                    changeData(val[0].getDate());
                let afterDate =
                    val[1].getFullYear() +
                    "-" +
                    changeData(val[1].getMonth() + 1) +
                    "-" +
                    changeData(val[1].getDate());
                this.modeltable = [];
                this.modeltablehead = [];
                this.getHistoryInfo(beforeDate, afterDate);
            }
        }
    }
};
</script>

<style>
.ruzhu-mess .el-form-item__label {
    font-family: Microsoft YaHei !important;
}

.left {
    width: 95%;
    position: relative;
    margin-top: 20px;
    height: 80%;
}

.handletitle {
    margin-top: 0;
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

.app-container>>>.background {
    font-weight: bolder;
    color: green;
}

.spanstyle {
    font-weight: bolder;
    color: #e2cc07c5;
}

.textDiv {
    margin-top: 20px;
    font-size: 13px;
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
</style>
