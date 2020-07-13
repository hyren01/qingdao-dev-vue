<template>
<div>
    <el-col style=" margin-top:10px;margin-bottom:10px;" :span="8">
        <span style=" margin: 0 4px 0 8px">展现列表:</span>
        <el-select v-model="listvalue" placeholder="请选择" size="mini">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
    </el-col>
    <!-- <el-col :span="6" v-if="listvalue == '1'" style=" margin-top:10px;margin-bottom:10px;">
        <el-input size="mini" placeholder="请输入表单标题" v-model="findData" prefix-icon="el-icon-search">
            <el-button size="mini" slot="append" @click="handleSearch">搜索</el-button>
        </el-input>
    </el-col> -->
    <el-col :span="6" v-if="listvalue == '1'" style="float:right; margin-top:10px;margin-bottom:10px;">
        <el-button type="primary" size="mini" @click="handleInput">数据导入</el-button>
    </el-col>
    <!-- <el-col :span="7" v-if="listvalue == '2'" style=" margin-top:10px;margin-bottom:10px;">
        <el-date-picker v-model="findData" type="date" placeholder="选择日期" size="mini" value-format="yyyy-MM-dd">
        </el-date-picker>
        <el-button type="primary" @click="handleFind" size="mini" style="margin-left:6px;">
            搜索
        </el-button>
    </el-col> -->
    <articleTable ref="articleTable" v-if="listvalue == '1'" />
    <eventTable ref="eventTable" v-if="listvalue == '2'" />
</div>
</template>

<script>
import articleTable from "./articleTable";
import eventTable from "./eventTable";

export default {
    components: {
        articleTable,
        eventTable
    },
    data() {
        return {
            dialogFormVisible: false,
            search: "",
            findData: "",
            findEvent: "",
            showEdit: [], // 显示编辑框

            length: 10,
            listvalue: "1",
            options: [{
                    value: "1",
                    label: "文章"
                },
                {
                    value: "2",
                    label: "事件"
                }
            ]
        };
    },
    mounted() {

    },
    watch: {},
    created() {

    },
    computed: {},
    methods: {
        handleFind() {},
        // 父调用子的方法
        handleSearch() {
            this.$refs.articleTable.handleSearch(this.findData);
        },

        handleInput() {
            this.$refs.articleTable.handleInput();

        },
        handleFind() {
            this.$refs.eventTable.handleFind(this.findData);

        },
    }
};
</script>

<style scoped>
.zhaiyao {
    color: #666;
    font-size: 10px;
}

.biaoti {
    font-weight: bold;
}

.active {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
}
</style>
