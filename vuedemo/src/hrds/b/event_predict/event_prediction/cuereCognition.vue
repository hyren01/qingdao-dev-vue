<template>
<div class="app-container">
    <el-row class="elRows">
        <span>线索识别</span>
        <el-button @click="cancel" type="primary" size="mini" class="el1 els">
            返回
        </el-button>
    </el-row>
    <div class="lines"></div>
    <el-row>
        <span style="float:right;margin-bottom:10px;">
            时间筛选:
            <el-date-picker id="date" v-model="valueTime" type="date" @change="changeValue" placeholder="选择日期">
            </el-date-picker>
        </span>
    </el-row>
    <el-row class="chartdata">
        <VeLine :data="chartdata" :extend="chartExtend" :events="chartEvents"></VeLine>
    </el-row>
</div>
</template>

<script>
var list;
import VeLine from "v-charts/lib/histogram.common";
import * as functionAll from "./index"
export default {
    components: {
        VeLine
    },
    data() {
        let that = this;
        this.chartEvents = {
            click: function (e) {
                let code;
                let valueTime = document.getElementById("date").value
                for (const i of list) {
                    if (i.name == e.name) {
                        code = i.code
                    }
                }
                // that.axios
                // .post(
                //     "/jdqd/action/JDQD/biz/event/getArticleList",
                //     qs.stringify({
                //         code:code
                //     })
                // )
                that.$router.push({
                    //name:'/jdqd/action/JDQD/biz/event/getArticleList',
                    path: '/example/table',
                    query: {
                        code: code,
                        valueTime: valueTime
                    }
                })
            }
        }
        return {
            chartdata: {
                columns: [],
                rows: []
            },
            valueTime: '',
            chartExtend: {
                series: {
                    //柱子宽度
                    barWidth: 100
                }
            }
        }
    },
    created() {
        this.getData();
    },
    methods: {
        // 返回上一级
        cancel() {
            this.$router.go(-1);
        },
        // 获取柱状图的数据
        getData(val) {
            functionAll.cuereGetData({
                    date: val
                })
                .then(res => {
                    list = res.data.mainList;
                    this.chartdata.columns = ['事件', '总数'];
                    res.data.mainList.forEach(item => {
                        item['事件'] = item.name;
                        item['总数'] = item.count;
                        item.value = item.code

                    });
                    this.chartdata.rows = res.data.mainList;
                })
                .catch(err => {
                    return false;
                });
        },
        // 获取日期对应数据
        changeValue(val) {
            if (val != null) {
                function changeData(num) {
                    return num > 9 ? (num + "") : ("0" + num);
                };
                let Date = (val.getFullYear() + '-' + changeData((val.getMonth() + 1)) + '-' + changeData(val.getDate()));
                this.getData(Date);
            }
        }
    }
}
</script>

<style scoped>
.handletitle {
    margin-top: 0;
    margin-bottom: 20px;
    padding-left: 10px;
    line-height: 20px;
    border-left: 8px solid #3080fe;
    font-weight: 400;
    font-size: 16;
}

.chartdata {
    padding: 2% 0;
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
