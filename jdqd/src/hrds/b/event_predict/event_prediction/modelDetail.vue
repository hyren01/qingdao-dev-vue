<template>
<div class="app-container">
    <el-row class="elRows">
        <el-button @click="cancel" size="mini" class="el1 els" type="primary">
            返回
        </el-button>
    </el-row>
    <div class="lines"></div>
    <div class="left">
        <el-tabs type="border-card" @tab-click="handleClick">
            <el-tab-pane label="按日期展现所有模型详情">
                <div class="handletitle">模型详情 <el-tooltip class="item" effect="dark" content="点击模型名称可查看历史" placement="right" style="margin-left:10px;">
                        <i class="el-icon-question"></i> </el-tooltip>
                    <span style="font-size:16px;font-weight:500;color:red">按天展现前10模型发生的概率</span>
                    <span style="float:right;margin-bottom:10px;">
                        时间筛选:
                        <el-date-picker v-model="valueTime" type="date" @change="changeValue" placeholder="选择日期">
                        </el-date-picker>
                    </span>
                </div>
                <el-table id="sortTable" :data="modeltable" style="width: 100%;margin-top:20px;" :default-sort="{ prop: 'para_id', order: 'ascending' }" border>
                    <el-table-column label="事件名称">
                        <template slot-scope="scope">
                            <span :class="eventKey ==scope.row.event ? 'maxClass' : ''">{{scope.row.event}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column v-for="(item,index) in modeltablehead" :key=index :label="item.propertyShow" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <!-- <span :class="scope.row.maxClass == scope.row[item.propertyName] ? 'maxClass' : (dataList[scope.row['detail_id' +index]] == scope.row[item.propertyName] ? 'colClass' : '') "> -->
                            <span :class="(dataList[scope.row['detail_id' +index]] == scope.row[item.propertyName] ? 'colClass' : '') ">
                                {{scope.row[item.propertyName]}}
                            </span>
                        </template>
                        <template slot="header">
                            <div class="elcolHeader" @click=" historyDetail(index,item)">
                                {{ item.propertyShow}}
                            </div>
                        </template>
                        <!-- <template scope="scope">
                            <span v-if="scope.row.model0=='0.0006'" style="color:red">{{scope.row.model0}}</span>
                            <span v-else>{{scope.row.model0}}</span>
                        </template> -->
                        <!-- <template slot="scope">
                            <span v-if="item.propertyName.model0==0.0006" style="color:red">{{item.propertyName.model0}}123</span>
                        </template> -->
                    </el-table-column>
                </el-table>
                <div class="textDiv"><span>*绿色表示：事件最高概率；红色表示：模型最高概率</span></div>

            </el-tab-pane>
            <el-tab-pane label="按事件展现所有模型详情">
                <h3>
                    <span style="font-size:16px;font-weight:500;">
                        事件:
                        <el-select v-model="listvalue" placeholder="请选择" size="mini" style="width:120px;" @change="selectevent">
                            <el-option v-for="item in options" :key="item.event_name" :label="item.event_name" :value="item.event_name">
                            </el-option>
                        </el-select>
                    </span>
                </h3>
                <div class="bestModelData">
                    <div class="bestContentleft">
                        <div class="bestModel">最佳模型</div>
                        <div class="bestModelDeatil">
                            <div class="divname">
                                <div class="modelName">模型名称:{{this.maxProbabilityModel}}</div>
                                <div class="modelPro"> 未来三天概率:</div>
                                <div class="modelProDetail"><strong>{{this. Probability1 }}</strong> <strong>{{ this.Probability2}}</strong> <strong>{{ this.Probability3}}</strong></div>
                            </div>

                        </div>
                    </div>
                    <div class="bestContentright">
                        <div class="bestModel">综合评分最好模型</div>
                        <div class="bestModelDeatil">
                            <div class="modelName">模型名称:{{this.maxScoreModel }}</div>
                            <div class="modelPro"> 未来三天概率</div>
                            <div class="modelProDetail"><strong>{{this. scoreProbability1 }}</strong> <strong>{{ this.scoreProbability2}}</strong> <strong>{{ this.scoreProbability3}}</strong></div>
                        </div>
                    </div>
                </div>
                <el-row class="elRows">
                    <el-col>
                        <h3>事件详情
                            <span style="font-size:16px;font-weight:500;color:red">按事件展现前10模型后3天发生的概率</span>
                            
                        </h3>
                    </el-col>
                </el-row>
                <div class="lines"></div>
                <!-- <h3>
                    事件详情
                    <span style="font-size:16px;font-weight:500;color:red">按事件展现前10模型后3天发生的概率</span>
                    <span style="float:right;margin-right:40px;font-size:16px">
                        事件:
                        <el-select v-model="listvalue" placeholder="请选择" size="mini" style="width:120px;" @change="selectevent">
                            <el-option v-for="item in options" :key="item.event_name" :label="item.event_name" :value="item.event_name">
                            </el-option>
                        </el-select>
                    </span>
                </h3> -->
                <el-table :data="modeltableEvent" style="width: 100%;margin-top:20px;" :default-sort="{ prop: 'para_id', order: 'ascending' }" border>
                    <el-table-column label="模型" prop="modelName"> </el-table-column>
                    <el-table-column v-for="(item,index) in modeltableheadEvent" :prop="item.prop" :key=index :label="item.date" show-overflow-tooltip>
                        <template slot="header">
                            <div>
                                {{ item.date}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="160">
                        <template slot-scope="scope">
                            <el-button size="mini" type="text" @click="dialogFormVisibleUpdate = true;handleEdit(scope.row);">查看历史</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

    </div>
</div>
</template>

<script>
import chartline from "@/hrds/b/event_predict/event_prediction/components/chartline";
import * as functionAll from "./index"
export default {
    data() {
        return {
            modeltable: [],
            modeltableEvent: [],
            options: [],
            modeltablehead: [],
            modeltableheadEvent: [],
            maxProbabilityModel: "",
            listvalue: '',
            valueTime: '',
            maxScoreModel: '',
            Probability1: "",
            Probability2: "",
            Probability3: "",
            scoreProbability1: "",
            scoreProbability2: "",
            scoreProbability3: "",
            dataList: {},

            eventKey: '',
        };
    },
    mounted() {
        this.getData(this.$route.query.forecastDate);
        this.valueTime = this.$route.query.forecastDate;
        // this.maxClass()
    },
    methods: {
        cancel() {
            this.$router.go(-1);
        },
        // 获取详情1
        getData(val) {
            functionAll.modelDetailGetData({
                    forecastDate: this.$route.query.forecastDate,
                    taskId: this.$route.query.taskId
                })
                .then(res => {
                    // 表格详细内容
                    let testdata = res.data.list;
                    let detailList = res.data.detailList;

                    for (const key in detailList) {
                        let data = detailList[key];
                        this.dataList[key] = Math.max(...data);
                    }

                    let resultArr = [];
                    testdata.forEach((item) => {
                        let obj = {};
                        obj.event = item.event;
                        let classMax = [];
                        item.model.forEach((items, index) => {
                            obj['model' + index] = items.probability;
                            obj['detail_id' + index] = items.detail_id;
                            // if (this.dataList[items.detail_id] == items.probability && detail_id.indexOf(items.detail_id) != -1) {
                            //     obj['colClass'] = true;
                            // } else {
                            //     obj['colClass'] = false;
                            // }
                            // obj['colClass'] = this.dataList[items.detail_id] == items.probability;
                            classMax.push(items.probability)
                        });

                        obj['maxClass'] = Math.max(...classMax);
                        resultArr.push(obj);
                        this.modeltable = resultArr;

                    });
                    // 表格头数据
                    let testHeadata = res.data.cols;
                    let resultArr2 = [];
                    testHeadata.forEach((item, index) => {
                        if (item == "事件名称") {
                            delete testHeadata[index];
                        } else {
                            resultArr2.push({
                                // 'propertyShow': '模型' + (index + 1),
                                'propertyShow': item,
                                'propertyName': 'model' + index,
                                // 'event' : item. 
                            })
                        }
                    })
                    this.modeltablehead = resultArr2;
                    let eventData = []
                    let eventCount = {}
                    this.modeltable.forEach((item, index) => {
                        this.modeltablehead.forEach((itm2, index2) => {
                            if (this.dataList[item['detail_id' + index2]] == item[itm2.propertyName]) {
                                if (eventData.indexOf(item.event) != -1) {
                                    let count = eventCount[item.event];
                                    eventCount[item.event] = count + 1;

                                } else {
                                    eventData.push(item.event);
                                    eventCount[item.event] = 1;
                                }
                            }
                        })
                    })
                    let count = 0;
                    this.eventKey = '';
                    for (const key in eventCount) {
                        if (eventCount.hasOwnProperty(key)) {
                            let element = eventCount[key];
                            if (element > count) {
                                this.eventKey = key;
                                count = element;
                            }
                        }
                    }

                })
                .catch(err => {
                    return false
                });
        },
        // 获取详情2
        getData2(val) {
            this.listvalue = '';
            functionAll.modelDetailGetData2({
                taskId: this.$route.query.taskId,
                event: val
            }).then((res => {
                let backData = res.data;
                // this.listvalue = backData.selectEvent;
                this.maxProbabilityModel = res.data.maxProbabilityModel;
                this.maxScoreModel = res.data.maxScoreModel;
                this.Probability1 = (res.data.maxProbabilityModelDetail[0].probability * 100).toFixed(2) + '%';
                this.Probability2 = (res.data.maxProbabilityModelDetail[1].probability * 100).toFixed(2) + '%';
                this.Probability3 = (res.data.maxProbabilityModelDetail[2].probability * 100).toFixed(2) + '%';
                this.scoreProbability1 = (res.data.maxScoreModelDetail[0].probability * 100).toFixed(2) + '%';
                this.scoreProbability2 = (res.data.maxScoreModelDetail[1].probability * 100).toFixed(2) + '%';
                this.scoreProbability3 = (res.data.maxScoreModelDetail[2].probability * 100).toFixed(2) + '%';
                this.options = res.data.eventList;
                if (val == undefined) {
                    this.listvalue = backData.selectEvent;
                } else {
                    this.listvalue = val;
                }
                let arrData = []
                backData.list.forEach((item, index) => {
                    let obj = {};
                    obj['modelName'] = item.model;
                    item.probabilityList.forEach((val, indexs) => {
                        obj['detail_id'] = val.detail_id;
                        obj['date' + (indexs + 1)] = val.probability;

                    })
                    arrData.push(obj);
                })
                this.modeltableEvent = arrData;

                // 表头数据处理
                let arrDataHead = [];
                backData.list[0].probabilityList.forEach((item, val) => {
                    let obj = {};
                    obj['date'] = item.forecast_date;
                    obj['prop'] = 'date' + (val + 1);
                    arrDataHead.push(obj);
                })
                this.modeltableheadEvent = arrDataHead;

            }))
        },
        // 获取表格信息不同的event
        selectevent(val) {
            this.getData2(val);
            this.listvalue = val;
        },
        // 查看模型详情
        handleClick(tab, event) {
            if (tab.label == "按日期展现所有模型详情") {
                this.getData();
            } else if (tab.label == "按事件展现所有模型详情") {
                this.getData2();
            }
        },
        // 详情2查看历史记录
        handleEdit(val) {
            console.log(val)
            this.$router.push({
                name: "historyDetail",
                query: {
                    taskId: this.$route.query.taskId,
                    detailId: val.detail_id,
                    forecastDate: this.$route.query.forecastDate,
                    modelName:val.modelName
                }
            });

        },
        // 详情1查看历史记录
        historyDetail(val,row) {
            this.$router.push({
                name: "historyDetail",
                query: {
                    taskId: this.$route.query.taskId,
                    detailId: this.modeltable[0]['detail_id' + val],
                    forecastDate: this.$route.query.forecastDate,
                    modelName: row.propertyShow
                }
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
    // watch : {
    //     valueTime : ()=>{
    //         this.count();
    //     }
    // }
};
</script>

<style>
.ruzhu-mess .el-form-item__label {
    font-family: Microsoft YaHei !important;
}
</style><style scoped>
.left {
    width: 95%;
    position: relative;
    margin-top: 20px;
    height: 80%;
}

.item {
    color: red;
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

.elcolHeader:hover {
    cursor: pointer;
}

.bestModelData {
    padding-left: 6%;
    padding-right: 6%;
    height: 180px;
    margin-top: 20px;
}

.bestModel {
    background-color: #3385ff;
    color: white;
    width: 315px;
    height: 30px;
    line-height: 30px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    padding-left: 16px;

}

.bestModelDeatil {
    width: 330px;
    height: 120px;
    padding: 16px;

}

.bestContentleft {
    float: left;
    width: 330px;
    box-shadow: 3px 3px 3px #888888;
}

.bestContentright {
    float: right;
    width: 330px;
    box-shadow: 3px 3px 3px #888888;
}

.modelName {
    margin-bottom: 14px;
}

.modelPro {
    margin-bottom: 12px;
}

.divname {
    height: 20px;
}

.modelProDetail {
    color: #3080fe;
    font-size: 24px;
}

.modelProDetail strong:first-child {
    margin-right: 20px;
}

.modelProDetail strong:nth-child(2) {
    margin-right: 20px;
}

.maxClass {
    color: #28cc44;
}

.colClass {
    color: #e71b53;
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

.el-row span {
    color: #2196f3;
    font-size: 18px;
}
</style>