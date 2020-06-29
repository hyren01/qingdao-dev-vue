<template>
<div class="app-container">
    <el-row class="elRows">
        <span></span>
        <el-button type="primary" class="el1 els" @click="handleClone" size="mini">
            <i class="block_icon fa fa-plus-circle"></i>数据备份
        </el-button>
    </el-row>
    <div>
        <el-table :data="tableData" :default-sort="{ prop: 'para_id', order: 'ascending' }" border stripe style="width: 100%" :height="tableHeight">
            <el-table-column label="序号" type="index" width="70px" align="center"/>
            <el-table-column label="备份时间" prop="bak_date" align='center'>
                <template slot-scope="{ row }">
                    <span class="biaoti">{{ row.bak_date }}</span>&nbsp;&nbsp;
                    <span class="biaoti">{{ row.bak_time }}</span>
                </template>
            </el-table-column>
            <el-table-column label="导出文章数量" prop="article_count" align='center'>
                <template slot-scope="{ row }">
                    <span class="biaoti">{{ row.article_count }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作员" prop="user_id" width="100%" align='center'>
                <template slot-scope="{ row }">
                    <span>{{ row.user_id }}</span>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination background style="float:right" layout="prev, pager, next, sizes, total, jumper" :page-sizes="[5, 10, 15, 20]" :page-size="pagesize" :total="this.length" @current-change="handleCurrentChange" @size-change="handleSizeChange" />
    </div>
</div>
</template>

<script>
import {getBakInfoList, generateInsertSqlDemo} from "./event_extract.js"

export default {
    components: {},
    data() {
      return {
        tableData: [],
        tableHeight: window.innerHeight - 180,
        screenHeight: window.innerHeight,
        pagesize: 10,
        currpage: 1,
        length: 10
      };
    },
    mounted() {
      this.find();
    },
    watch: {},
    created() {},
    computed: {},
    methods: {
        handleCurrentChange(cpage) {
          this.currpage = cpage;
          this.find();
        },
        handleSizeChange(psize) {
          this.pagesize = psize;
          this.find();
        },
        find() {
          getBakInfoList({
            currPage: this.currpage,
            pageSize: this.pagesize,
            userId: sessionStorage.getItem("userId")
          })
          .then(res => {
            this.length = res.data.count;
            this.tableData = [...res.data.bakInfoList];
          })
        },
        handleClone() {
          generateInsertSqlDemo({
            userId: sessionStorage.getItem("userId"),
          })
          .then(res => {
            this.$message({
                showClose: true,
                message: "数据备份成功,存放在/hyren/jdqd/insertSql.sql中",
                type: "success",
                duration: 0
            });
          })
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
    margin:10px 0;
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
</style>
