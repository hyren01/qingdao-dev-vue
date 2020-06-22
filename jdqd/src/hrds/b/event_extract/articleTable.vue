<template>
  <div class="loindex">
    <el-col :span="6" style="float:left;margin-top:-2%;margin-left:18%">
      <el-input size="mini" placeholder="请输入表单标题" v-model="findData" prefix-icon="el-icon-search">
        <el-button size="mini" slot="append" @click="handleSearch">搜索</el-button>
      </el-input>
    </el-col>
    <el-button type="primary" style="float:right;margin-top:-2%" size="mini" @click="handleInput">数据导入</el-button>
    <el-table
      :data="tableData"
      :height="tableHeight"
      style=" width: 100%;margin-top:70px"
      :default-sort="{ prop: 'para_id', order: 'ascending' }"
      size="medium" border stripe 
    >
      <el-table-column label="序号" type="index" width="70px" align="center" />
      <el-table-column label="标题" prop="translated_title" show-overflow-tooltip align='center'>
          <template slot-scope="{ row }">
              <span class="biaoti">{{ row.translated_title }}</span>
              <br />
              <span class="zhaiyao">{{ row.contentSummary[0] }}</span>
          </template>
      </el-table-column>
      <el-table-column label="相关事件" prop="event" show-overflow-tooltip align='left'>
        <template slot-scope="{ row }">
          <span v-for="(item2, index) in row.event" :key="index">
            事件{{ index + 1 }}:{{ item2.event }}
            <br />
          </span>
        </template>
      </el-table-column>
      <el-table-column label="网站名称" prop="source" align='center' width="80">
        <template slot-scope="{ row }">
          <span>{{ row.source }}</span>
        </template>
      </el-table-column>
      <el-table-column label="爬取日期" prop="remark" align='center' width="160">
        <template slot-scope="{ row }">
          <span>{{ row.spider_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align='center' width="80">
          <template slot-scope="{ row }">
              <el-button size="mini" type="text" @click="handleEdit(row)">详情</el-button>
          </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      style="float:right"
      layout="prev, pager, next, sizes, total, jumper"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      :total="this.length"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
import {getArticleList,readFileDecode} from "./event_extract.js"

export default {
  data() {
    return {
      tableHeight: window.innerHeight - 180,
      screenHeight: window.innerHeight,
      tableData: [],
      dialogFormVisible: false,
      search: "",
      findData: "",
      showEdit: [], // 显示编辑框
      showBtn: [],
      pagesize: 10,
      currpage: 1,
      value: "success",
      length: 10
    };
  },
  watch: {
    screenHeight(val) {
      this.screenHeight = val;
      this.tableHeight = this.screenHeight - 180;
    }
  },
  created() {
    this.find();
    window.onresize = () => {
      return (() => {
        window.screenHeight = window.innerHeight;
        this.screenHeight = window.screenHeight;
      })();
    };
  },
  mounted() {
    // console.log("1");
    this.find();
  },
  computed: {},
  methods: {
    handleEdit(item) {
      this.$router.push({
        name: "suanfa",
        query: {
          id: item.article_id,
          type: 1
        }
      });
    },
    // 查看所有数据
    find() {
      getArticleList({
        title: this.findData,
        currPage: this.currpage,
        pageSize: this.pagesize,
        code: this.$route.query.code,
        valueTime: this.$route.query.valueTime
      }).then(res => {
        this.length = res.data.count;
        res.data.articleList.forEach((item, index) => {
          item.event = item.event.slice(0, 3)
        })
        this.tableData = [...res.data.articleList];
      })
    },
    handleCurrentChange(cpage) {
      this.currpage = cpage;
      this.find();
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
      this.find();
    },
    handleSearch() {
      this.$message({
        showClose: true,
        message: "暂未实现",
        type: "success",
        duration: 0
      })
      this.find();
    },
    handleInput() {
      readFileDecode().then(res => {
          if (res.data.repCode == "success") {
            this.$message({
              showClose: true,
              message: "导入成功",
              type: "success",
              duration: 0
            });
          }else{
            this.$message({
              showClose: true,
              message: res.data.repMessage,
              type: "success",
              duration: 0
            });
          }
      })
    }
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
