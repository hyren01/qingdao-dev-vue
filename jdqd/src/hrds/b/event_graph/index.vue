
<template>
  <div id="container3">
    <el-row>
      <el-col :span="10" style="margin-top: 20px;margin-bottom:20px;margin-left:20px">
        <el-input placeholder="请输入搜索信息" prefix-icon="el-icon-search" v-model="search" size="mini"></el-input>
      </el-col>
      <el-col :span="6" style="margin-top: 20px;margin-bottom:20px; margin-left:20px;">
        <el-button type="primary" size="mini" @click="select()">搜索</el-button>
      </el-col>
    </el-row>
    <el-col :span="16">
      <!-- <div
        id="container"
        style="width:100%; height:500px;margin-bottom:20px; overflow:hidden;border-radius: 4px; border: 1px solid rgba(80, 80, 80, 0.4);"
      ></div>-->
      <el-table
        id="container"
        :data="tableData"
        style="width:100%; height:500px;margin-bottom:20px; overflow:hidden;border-radius: 4px; border: 1px solid rgba(80, 80, 80, 0.4);"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        :default-sort="{ prop: 'para_id', order: 'ascending' }"
        border
      >
        <el-table-column label="序号" type="index" width="60" align="center" />
        <el-table-column label="事件" prop="translated_title" width="440" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.event_sentence }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" text-align="center" width="160" align="center">
          <template slot-scope="{ row }">
            <el-button :id="row.event_id" size="mini" type="primary" @click="getEventRel(row)">查看图谱</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <el-col :span="8" style="position: relative;">
      <el-col :span="spanNubers">
        <div class="divImgs" v-for=" (item,index) in ListAll" :key="index">
          <div class="cssimg"></div>
        </div>
      </el-col>
      <el-col :span="spanNumber" :offset="offsetNum" class="wrapper">
        <div class="positonsAll" id="positonsAll">
          <div
            :class="item.click == '1'&& item.click !=undefined ? 'infoAll1':'infoALL'"
            v-for=" (item,index) in ListAll"
            :key="index"
            @mouseover="hoveLIn(index,item.event_ids)"
          >
            <el-tooltip effect="dark" :content="item.translated_title" placement="top">
              <h3 class="infoALLp1" @click="getArticleInfo(item)">{{item.translated_title}}</h3>
            </el-tooltip>
            <p class="infoALLp2"></p>
          </div>
        </div>
      </el-col>
    </el-col>

    <el-dialog title="文章详情" :visible.sync="dialogVisible" width="90%">
      <div class="header">{{ article_title }}</div>
      <br />
      <el-row :gutter="40">
        <el-col>
          <!-- 文章内容 -->
          <div class="content-left" v-html="this.article_content">{{ article_content }}</div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import echarts from "echarts";
import svg from "svg";
import * as functionAll from "./index";
//import imgSrc from '../../assets/img/echar_person.png'
import LeaderLine from "leader-line-vue";
export default {
  name: "personRelation",
  data() {
    return {
      search: "",
      ListAll: [],
      event_id: "",
      event_sentence: "",
      article_id: "",
      title: "",
      sentence: "",
      dialogVisible: false,
      showOrhidden: false,
      article_title: "",
      article_content: "",
      target_name: "",
      infoALL: "infoALL",
      spanNumber: 20,
      offsetNum: 4,
      spanNubers: 0,
      tableData: [],
      eventIdList: [],
      line: []
    };
  },
  mounted() {},
  methods: {
    hoveLIn(i, event_ids) {
      //将事件id相同的连线
      event_ids.forEach(item => {
        if (document.getElementById(item.event_id) != undefined) {
          this.line.push(
            LeaderLine.setLine(
              document.getElementsByClassName("infoALL")[i],
              document.getElementById(item.event_id)
            )
          );
        }
      });
      console.log(this.line);
    },
    getArticleInfo(item) {
      console.log(item);
      this.dialogVisible = true;
      functionAll
        .getArticleInfo({
          article_id: item.article_id,
          event_id: this.eventIdList
        })
        .then(res => {
          this.article_content = res.data.result_article.content;
          res.data.result_sentence.forEach(list => {
            // 匹配关键字正则
            const replaceReg = new RegExp(list.event_sentence, "g");
            // 高亮替换v-html值
            const replaceString =
              '<span class="search-text">' + list.event_sentence + "</span>";
            this.article_content = this.article_content.replace(
              replaceReg,
              replaceString
            );
          });
          this.article_title = item.translated_title;
        })
        .catch(err => {
          return false;
        });
    },
    select() {
      //调用相似度匹配，查询列表
      functionAll
        .handleGet({
          search: this.search
        })
        .then(res => {
          this.tableData = [...res.data.events];
          //将返回的所有事件id存为一个数组
          res.data.events.forEach(item => {
            this.eventIdList.push(item.event_id);
          });
          //查询文章列表
          functionAll
            .getArticleList({
              event_id: this.eventIdList
            })
            .then(res => {
              this.ListAll = res.data.result;
              this.ListAll.forEach(item => {
                item["click"] = "0";
              });
              console.log(this.ListAll);
            })
            .catch(err => {
              return false;
            });
        })
        //   // }
        // })
        .catch(err => {
          console.log(err);
        });
    },
    getEventRel(param) {
      if (this.line != null) {
        this.line.forEach(it => {
          it.remove();
        });
      }
      this.$router.push({
        name: "Echarts",
        query: {
          event_id: param.event_id,
          event_sentence: param.event_sentence
        }
      });
    }
  }
};
</script>

<style>
.wrapper {
  padding: 10px 0;
  border: 1px solid rgba(80, 80, 80, 0.4);
  border-radius: 4px;
  min-height: 500px;
  /* grid-template-rows: 30px 50px 30px 50px 30px 210px; */
}

.item {
  text-align: left;
  color: rgb(80, 80, 80);
}

.item:nth-child(2n-1) {
  height: 5vh;
  background: rgb(237, 237, 237);
  line-height: 30px;
  font-weight: bold;
}

.item:nth-of-type(2n) {
  font-size: 13px;
  line-height: 50px;
  font-family: "Microsoft YaHei";
}

#content {
  height: 15vh;
  padding: 10px;
  letter-spacing: 0.5px;
  font-size: 13px;
  font-family: "Microsoft YaHei";
  line-height: 1.5;
  font-weight: 5px;
  overflow: auto;
}

/* 标题 */
.header {
  font-size: 27px;
  text-align: center;
  width: 60vw;
  margin: 0 auto;
}

/* 内容 */
.content-left {
  text-indent: 2em;
  letter-spacing: 1px;
  font-size: 16px;
  font-family: "Microsoft YaHei";
  line-height: 1.9;
}

.header2 {
  margin-top: 10px;
  color: #666;
  font-size: 13px;
  text-align: left;
  margin-left: 20px;
}

.search-text {
  color: red;
}

.wrapper1 {
  width: 21vw;
  height: 10vh;
  float: right;
  text-align: left;
  margin-right: 20px;
  background-color: #e6e6ee;
  /* grid-template-rows: 30px 50px 30px 50px 30px 210px; */
}

.infoALL {
  width: 100%;
  height: 72px;
  background-color: #e6e6ee;
  margin-top: 10px;
  font-size: 12px;
  padding: 2px 2px 2px 6px;
  position: relative;
}
.infoALL:first-child {
  height: 72px;
  width: 100%;
  background-color: #e6e6ee;
  margin-top: 0px;
  font-size: 12px;
  padding: 2px 2px 2px 6px;
}
.infoAll1 {
  width: 100%;
  height: 72px;
  background-color: #e6e6ee;
  margin-top: 10px;
  font-size: 12px;
  padding: 2px 2px 2px 6px;
  position: relative;
  border: 2px solid #1296db;
}
.infoAll1:first-child {
  height: 72px;
  width: 100%;
  background-color: #e6e6ee;
  margin-top: 0px;
  font-size: 12px;
  padding: 2px 2px 2px 6px;
  border: 2px solid #1296db;
}
.infoALLp1 {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
  /* line-height: 12px; */
}
.infoALLp1:hover {
  color: blue;
}
.infoALLp2 {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: default;
  /* line-height: 12px; */
}
.positons {
  clear: both;
  width: 50px;
  height: 76px;
  position: absolute;
  top: 0px;
  left: -50px;
  z-index: 1000;
}

.cssimg {
  width: 100%;
  height: 76px;
}
/* .positonsAll{ */
/* position: relative;
} */
</style>