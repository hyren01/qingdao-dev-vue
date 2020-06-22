<template>
<div>
    <el-col style="float:left">
        展现列表:
        <el-select v-model="listvalue" placeholder="请选择" size="mini" style="width:90px;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
    </el-col>
    <articleTable v-if="listvalue == '1'" />
    <eventTable v-if="listvalue == '2'" />
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
        handleFind() {}
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
