<template>
  <div class="loindex">
    <el-dialog title="文章列表" :visible.sync="dialogVisible" width="60%">
      <el-table
        :data="tableData2"
        style="width:100%;"
        size="medium" border stripe 
        :height="tableHeight"
      >
        <el-table-column prop="translated_title" label="文章标题" align="center">
        </el-table-column>
        <el-table-column prop="create_date" label="创建日期" align="center" width="120">
        </el-table-column>
        <el-table-column label="操作" align='center' width="80">
          <template slot-scope="{ row }">
              <el-button size="mini" type="text" @click="handleEdit(row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-col :span="7" style="float:left;margin-top:-2%;margin-left:18%">
      <el-date-picker v-model="findData" type="date" placeholder="选择日期" size="mini" value-format="yyyy-MM-dd">
      </el-date-picker>
      <el-button type="primary" @click="handleFind" size="mini" style="float:right;">
      搜索
      </el-button>
    </el-col>
    <el-table
      :data="tableData"
      style=" width: 100%;margin-top:60px"
      :height="tableHeight"
      :default-sort="{ prop: 'para_id', order: 'ascending' }"
      size="medium" border stripe 
    >
      <el-table-column label="序号" type="index" width="70px" align="center" />
      <el-table-column label="相关事件" prop="title" show-overflow-tooltip align='center'>
        <template slot-scope="{ row }">
          <span class="biaoti">{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="事件主语" prop="event_zy" show-overflow-tooltip align='center'>
        <template slot-scope="{ row }">
          <span>{{ row.event_zy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="事件谓语" prop="event_wy" align='center'>
        <template slot-scope="{ row }">
          <span>{{ row.event_wy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="事件宾语" prop="event_by" show-overflow-tooltip align='center'>
        <template slot-scope="{ row }">
          <span>{{ row.event_by }}</span>
        </template>
      </el-table-column>
      <el-table-column label="事件时间" prop="create_date" width="100%" align='center'>
        <template slot-scope="{ row }">
          <span>{{ row.create_date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="符合文章数"
        prop="num"
        width="100%"
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{ row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align='center' width="80">
          <template slot-scope="{ row }">
              <el-button size="mini" type="text" @click="handleEdit2(row)">详情</el-button>
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
import qs from "qs";
import {getEventArticle, getEventRelateArticleMess, getEventArticleByDate} 
from "./event_extract.js"

export default {
  data() {
    return {
      tableHeight: window.innerHeight - 180,
      screenHeight: window.innerHeight,
      tableData: [],
      dialogVisible: false,
      search: "",
      findData: "",
      showEdit: [], // 显示编辑框
      showBtn: [],
      tableData2: [],
      pagesize: 10,
      currpage: 1,
      value: "success",
      // type: this.$store.state.table.type,
      length: 10,
      title: "",
      id: ""
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
  computed: {},
  methods: {
    handleEdit2(item) {
      this.title = item.title;
      this.id = item.event_id;
      getEventRelateArticleMess({solr_event_id: item.event_id})
      .then(res => {
        this.dialogVisible = true;
        this.tableData2 = [...res.data];
      })
    },
    // 查看详情
    handleEdit(item) {
      this.dialogVisible = false;
      this.$router.push({
        name: "singlesuanfa",
        query: {
          id: item.article_id,
          solr_event_id: this.id,
          title: this.title,
          type: 2
        }
      });
    },
    // 查看所有数据
    find() {
      getEventArticle({
            currPage: this.currpage,
            pageSize: this.pagesize,
            code: this.$route.query.code
      }).then(res => {
        this.length = Number(res.data.count);
        this.tableData = [...JSON.parse(res.data.data)];
      })
    },
    handleCurrentChange(cpage) {
      this.currpage = cpage;
      if (this.findData != "") {
        this.handleFind();
      } else {
        this.find();
      }
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
      if (this.findData != "") {
        this.handleFind();
      } else {
        this.find();
      }
    },
    handleFind() {
      getEventArticleByDate({
        create_date: this.findData,
        currPage: this.currpage,
        pageSize: this.pagesize,
        code: this.$route.query.code
      })
      .then(res => {
        this.length = Number(res.data.count);
        this.tableData = [...JSON.parse(res.data.data)];
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
