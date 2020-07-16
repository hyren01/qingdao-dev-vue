<template>
<div class="loindex innerpadd" >
    <el-row class="elRows">
        <span></span>
        <el-button type="primary" class="el1 els" @click="exportFile()" v-if="flag == '1'" size="mini">
            <i class="block_icon fa el-icon-circle-plus"></i>生成数据
        </el-button>
        <el-button type="primary" class="el1 els" @click="uploadFrame()" v-if="flag == '0'" size="mini">
            <i class="block_icon fa el-icon-circle-plus"></i>导入数据
        </el-button>
    </el-row>
    <el-row class="elRows">
        <el-table :data="tableData" size="medium" border  style="width: 100%" :height="tableHeight">
            <el-table-column type="index" label="序号" width="70px" align='center'></el-table-column>
            <el-table-column label="操作表名" prop="event" show-overflow-tooltip align='left'>
                <template slot-scope="{ row }">
                    <span>{{ data_enum[row.data_enum] }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作类型" show-overflow-tooltip v-if="flag == '1'" align='left'>
                <template slot-scope="{ row }">
                    <span>{{ operator_type[row.operator_type] }}</span>
                </template>
            </el-table-column>
            <el-table-column label="数据行数" show-overflow-tooltip align='left'>
                <template slot-scope="{ row }">
                    <span>{{ row.nums }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作日期" show-overflow-tooltip align='center'>
                <template slot-scope="{ row }">
                    <span>{{ row.create_date }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align='center' width="200">
                <template slot-scope="{ row }">
                    <el-button size="mini" type="text" style="color: green" @click="download(row)">下载</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background style="float:right" layout="prev, pager, next, sizes, total, jumper" :page-sizes="[5, 10, 15, 20]" :page-size="pagesize" :total="tableData.length" @current-change="handleCurrentChange" @size-change="handleSizeChange" /> 
    </el-row>
    <el-dialog :title="titleType" :visible.sync="dialogFormVisible">
        <el-form ref="formImport" :model="formImport" :label-position="labelPosition">
            <el-form-item label="上传要导入的数据" :label-width="formLabelWidth">
                <el-upload class="upload-demo" ref="upload" :fileList="fileList" action="" :auto-upload="false" :on-change="handleChange">
                    <el-button size="small" type="primary">选择上传文件</el-button>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="margin-top:-5%">
            <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="inputFile()" size="mini">上传</el-button>
        </div>
    </el-dialog>
    <!-- loading -->
    <transition name="fade">
        <loading v-if="isLoading" />
    </transition>
</div>
</template>

<script>
import { exportData, inputData, downloadFile, getTDataManage } from "./data_manage.js"
import Loading from '../../components/loading';

export default {
    components: {
        Loading
    },
    data() {
        return {
            flag: sessionStorage.getItem("flag"),
            isLoading: false,
            labelPosition: "left",
            dialogFormVisible: false,
            isSave: true,
            formLabelWidth: '140px',
            titleType: "",
            formImport: {},
            tableHeight: window.innerHeight - 100,
            screenHeight: window.innerHeight,
            tableData: [],
            pagesize: 10,
            currpage: 1,
            length: 0,
            operator_type : {
                '1': "导出",
                '2': "导入"
            },
            data_enum : {
                '01': "t_article_msg",
                '02': "t_article_msg_en",
                '03': "t_article_msg_zh",
            },
            fileList: [],
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
        // 查看所有数据
        getData() {
            getTDataManage().then(res => {
                this.tableData = res.data.data;
                this.tableData.length = res.data.data.length;
            })
        },
        download(row) {
            this.$Msg.confirmMsg("确定下载?")
            .then(() => {
                this.isLoading = true;
                downloadFile(row.id).then((res) => {
                    const blob = new Blob([res.data]);
                    if (window.navigator.msSaveOrOpenBlob) {
                        // 兼容IE10
                        navigator.msSaveBlob(blob, this.data_enum[row.data_enum]);
                    } else {
                        //  chrome/firefox
                        let aTag = document.createElement("a");
                        aTag.download =  this.data_enum[row.data_enum];
                        aTag.href = URL.createObjectURL(blob);
                        if (aTag.all) {
                            aTag.click();
                        } else {
                            //  兼容firefox
                            var evt = document.createEvent("MouseEvents");
                            evt.initEvent("click", true, true);
                            aTag.dispatchEvent(evt);
                        }
                        URL.revokeObjectURL(aTag.href);
                    }
                    this.isLoading = false;
                });
            })
            .catch(() => {
                this.$Msg.customizTitle("下载失败", "error")
                this.isLoading = false;
            });
        },
        exportFile() {
            this.$Msg.confirmMsg("确定生成?")
            .then(() => {
                exportData();
            })
            .catch(() => {
                this.$Msg.customizTitle("导出失败", "error")
                this.isLoading = false;
            });

            this.isLoading = false;
            this.getData();
        },
        inputFile() {
            if(this.fileList.length != 1) {
                this.$Msg.customizTitle("只允许上传一个文件", "error");
                return;
            }
            this.isLoading = true;
            let param = new FormData() // 创建form对象
            param.append('file', this.fileList[0].raw);
            inputData(param).then(res => {
                this.formImport = {};
                this.dialogFormVisible = false;
                this.isLoading = false;
            })
            .catch(() => {
                this.$Msg.customizTitle("文件上传失败", "error")
                this.isLoading = false;
            });
        },
        handleCurrentChange(cpage) {
            this.currpage = cpage;
        },
        handleSizeChange(psize) {
            this.pagesize = psize;
        },
        // 获取上传的文件详情
        handleChange(file, fileList) {
            if (fileList.length > 0) {
                this.fileList = [fileList[fileList.length - 1]]
            }
        },
        uploadFrame() {
            this.dialogFormVisible = true
        },
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