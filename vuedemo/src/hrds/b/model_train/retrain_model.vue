<template>
<div class="app-container">
    <div class="left">
        <div>
            <el-form ref="form" :model="form" status-icon label-width="30%" class="demo-ruleForm">
                <h4 class="handletitle">基础信息</h4>
                <el-row type="flex" justify="left">
                    <el-col>
                        <el-form-item label="任务版本" prop="version">
                            <el-col> V4 </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col></el-col>   
                </el-row>
                <el-row type="flex" justify="left">
                    <el-col>
                        <el-form-item label="任务类型">
                            <el-col>
                                {{data.model_name}}
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col></el-col>   
                </el-row>
                <el-row type="flex" justify="left">
                    <el-col>
                        <el-form-item label="模型名称" prop="tables_name">
                            <el-col>
                                <el-input v-model="data.model_name" size="medium"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col></el-col>   
                </el-row>
                <el-row type="flex" justify="left">
                    <el-col>
                        <el-form-item label="任务备注" prop="remark" >
                            <el-col style="width:129%;">
                                <el-input type="textarea" v-model="data.remark"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col></el-col>   
                </el-row>
                <h4 class="handletitle">添加数据</h4>
                <el-row type="flex" justify="left">
                    <el-col>
                        <el-form-item label="选择数据集">
                            <el-col style="width:200%">
                                <el-input v-model="form.tables_name" size="medium" style="width:50%;float:left"></el-input>
                                <el-upload class="upload-demo" style="float:left;margin-left:0.5%" action="" multiple :limit="3">
                                    <el-button size="medium" type="primary">选择数据</el-button>
                                </el-upload>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col></el-col>   
                </el-row>
                <el-row type="flex" justify="left">
                    <el-col>
                        <el-form-item label="数据增加方式">
                            <el-col style="width:145%;">
                                <el-radio-group v-model="form.data_append_type">
                                    <el-radio label="追加">追加</el-radio>
                                    <el-radio label="替换">替换</el-radio>
                                </el-radio-group>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col></el-col>   
                </el-row>
                <el-row type="flex" justify="left">
            <el-col style="width:100%">
              <el-form-item label="是否数据增强" prop="is_increase">
                <el-switch v-model="form.checkList1"></el-switch>
                <el-checkbox-group v-model="form.checkList" size="mini" v-if="form.checkList1" style="width:200%">
                  <el-checkbox label="同义词插入和替换" border></el-checkbox>
                  <el-checkbox label="词语交换和删除、中外文反译（20种语言）" border></el-checkbox>
                  <el-checkbox label="缩句" border></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col></el-col>
          </el-row>  
                <h4 class="handletitle">配置参数</h4>
                <el-row type="flex" justify="left">
                    <el-col>
                        <el-form-item label="选择预训练模型">
                            <el-col style="width:200%;">
                                <el-radio v-model="form.pre_model" style="width:14%" label="roberta" border>Roberta</el-radio>
                                <el-radio v-model="form.pre_model" style="width:13%;margin-left:-3.8%" label="nerza" border>Nerza</el-radio>
                                <el-radio v-model="form.pre_model" style="width:13%;margin-left:-3.8%" label="bert" border>Bert</el-radio>
                                <el-radio v-model="form.pre_model" style="width:13%;margin-left:-3.8%" label="albert" border>Albert</el-radio>
                                <el-radio v-model="form.pre_model" style="width:13%;margin-left:-3.8%" label="" border>无模型</el-radio>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col></el-col>
                </el-row>
                <el-row type="flex" justify="left">
                    <el-col>
                        <el-form-item label="学习率">
                            <el-col>
                                <el-input style="width:45%" v-model="form.min_study" size="medium"></el-input>
                                -
                                <el-input style="width:45%" v-model="form.max_study" size="medium"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="批量大小">
                            <el-col style="width:95%">
                                <el-input v-model="form.batch" size="medium"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="left">
                    <el-col>
                        <el-form-item label="字符串最大长度">
                            <el-col style="width:95%">
                                <el-input v-model="form.max_str_length" size="medium"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="循环次数">
                            <el-col style="width:95%">
                                <el-input v-model="form.epoch" size="medium"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="left">
                    <el-col>
                        <el-form-item label="批量存储间隔">
                            <el-col style="width:95%">
                                <el-input v-model="form.save_batch_num" size="medium"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="批量日志间隔">
                            <el-col style="width:95%">
                                <el-input v-model="form.log_batch_num" size="medium"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="left" v-if="form.event_type == '关系存在性判定'">
                    <el-col>
                        <el-form-item label="网格单元">
                            <el-col style="width:95%">
                                <el-input v-model="form.epoch" size="medium"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col></el-col>
                </el-row>
                <h4 class="handletitle">配置任务</h4>
                <el-row type="flex" justify="left">
                    <el-col>
                        <el-form-item label="是否使用GPU" prop="is_increase">
                            <el-switch v-model="form.is_gpu"></el-switch>
                            <el-radio-group v-model="form.gpu_id" v-if="form.is_gpu" style="margin-left:10%">
                                    <el-radio v-model="form.gpu_id" label="gpu1" border>GPU1</el-radio>
                                    <el-radio v-model="form.gpu_id" label="gpu2" style="margin-left:-11%" border>GPU2</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col></el-col>
                </el-row>
                <el-row type="flex" justify="left">
            <el-col>
              <el-form-item label="是否通知" prop="is_increase">
                <el-switch v-model="form.is_call"></el-switch>
              </el-form-item>
            </el-col>
            <el-col></el-col>
          </el-row>
          <el-row type="flex" justify="left">
            <el-col v-if="form.is_call">
              <el-form-item label="通知邮箱">
                <el-col>
                  <el-input v-model="form.email" size="medium"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col v-if="form.is_call">
              <el-form-item label="通知手机">
                <el-col>
                  <el-input v-model="form.phone" size="medium"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
            </el-form>
        </div>
        <div style="float:right;margin-bottom:1.5%">
            <el-button type="success" @click="cancel" size="small">
                {{ loadingtext }}
            </el-button>
            <el-button @click="cancel" size="small">
                取消
            </el-button>
        </div>
    </div>
</div>
</template>

<script>
import { addModelInfo } from "./model_train.js"
import * as validator from "@/utils/js/validator"
export default {
    data() {
        return {
            abc: true,
            loadingbut: false,
            loadingtext: "立即创建",
            labelPosition: "right",
            rule: validator.default,
            tableData: [{
                    version: 'V1',
                    accuracy: '56.9%',
                    jingquelv: '80%',
                    zhaohuilv: '56.8%',
                    f1: '56.8'
                },
                {
                    version: 'V2',
                    accuracy: '66.1%',
                    jingquelv: '89.2%',
                    zhaohuilv: '86.8%',
                    f1: '85.8'
                }, 
            ],
            form: {
                pre_model: "bert",
                event_type: "事件抽取",
                name: "",
                delivery: false,
                type: [],
                model_id: "", //模型id
                tables_name: "data_xlshuju_1,data_xlshuju_2", //训练表名
                model_name: "", //模型名称
                dr_min: "", //降维最小维度
                dr_max: "", //降维最大维度
                delay_min_day: "", //滞后最小天数
                delay_max_day: "", //滞后最大天数
                neure_num: "", //神经元个数
                train_batch_no: "", //网络数据个数
                days: "", //预测天数
                epoch: 10, //训练次数
                size: "", //步长
                traintime: "",
                modeltime: "",
                tran_start_date: "", //训练开始日期
                tran_end_date: "", //训练结束日期
                data_set: "data_xlshuju_1,data_xlshuju_2",
                is_increase: true,
                min_study: 0.01,
                max_study: 0.8,
                batch: 500,
                max_str_length: 128,
                save_batch_num: 500,
                log_batch_num: 500,
                is_gpu: true,
                gpu_id: "gpu1",
                data_append_type: "替换",
                checkList: []
            },
            data: {}    //页面传的值
        };
    },
    created() {
        this.data = this.$route.query.data
        if (this.data.status == '已完成' || this.data.status == '已发布') {
            this.tableData.push({
                version: 'V3',
                accuracy: '76.1%',
                jingquelv: '94.3%',
                zhaohuilv: '93.7%',
                f1: '91.1'
            })
        }
    },
    methods: {
        onSubmit(form) {
            this.$refs[form].validate(valid => {
                if (valid) {
                    addModelInfo({
                            tables_name: this.form.tables_name,
                            model_name: this.form.model_name,
                            dr_min: this.form.dr_min,
                            dr_max: this.form.dr_max,
                            delay_min_day: this.form.delay_min_day,
                            delay_max_day: this.form.delay_max_day,
                            neure_num: this.form.neure_num,
                            train_batch_no: this.form.train_batch_no,
                            epoch: this.form.epoch,
                            days: this.form.days,
                            event_type: this.form.event_type,
                            size: this.form.size,
                            tran_start_date: this.form.tran_start_date,
                            tran_end_date: this.form.tran_end_date,
                            evaluation_start_date: this.form.evaluation_start_date,
                            evaluation_end_date: this.form.evaluation_end_date
                        })
                        .then(res => {
                            if (res.code == 200) {
                                this.$router.go(-1);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            })
        },
        cancel() {
            this.$router.go(-1);
        }
    }
}
</script>

<style>
.ruzhu-mess .el-form-item__label {
    /* font-size: 30px !important; */
    font-family: Microsoft YaHei !important;
}
</style><style scoped>
.left {
    width: 95%;
    position: relative;
    margin-top: 20px;
    height: 80%;
}

.right {
    position: absolute;
    margin-top: 20px;
    margin-left: 52%;
    height: 68%;
    width: 45%;
}

.test {
    position: absolute;
    margin-top: 15%;
    margin-left: 45.7%;
}

.line {
    text-align: center;
}

.btns {
    position: absolute;
    margin-left: 59.5%;
    width: 15%;
    height: 10%;
}

.btns-cancel {
    float: right;
}

.el-icon-question {
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
</style>
