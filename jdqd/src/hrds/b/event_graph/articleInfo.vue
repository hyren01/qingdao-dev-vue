<template>
  <div class="app-container innerpadd">
    <el-button size="small"
               type="primary"
               @click="back">返回</el-button>
    <div class="header">{{ title }}</div>
    <el-row :gutter="20">
      <el-col :span="16"> </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col >
        <!-- 文章内容 -->
        <div class="content-left" v-html="article">
          {{ article }}
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "Syspara",
  data () {
    return {
      title: "",
      article:""
    };
  },
  created () {
    this.find();
  },

  methods: {
    changeColor (resultsList) {
      resultsList.map((item, index) => {
        // console.log('item', item)
        if (this.keyWords && this.keyWords.length > 0) {
          // 匹配关键字正则
          const replaceReg = new RegExp(this.keyWords, "g");
          console.log(replaceReg);
          // 高亮替换v-html值
          const replaceString =
            '<span class="search-text">' + this.keyWords + "</span>";
          // '<span >' + this.keyWords + '</span>'
          resultsList[index].name = item.name.replace(
            replaceReg,
            replaceString
          );
        }
      });
      this.results = [];
      this.results = resultsList;
    },
    // 查看所有数据
    find () {
      let id = this.$route.params.article_id
      let title = this.$route.params.title
      let sentence=this.$route.params.sentence
      console.log(sentence)
      this.axios
        .post(
          "http://localhost:5000/getArticleInfo",
          qs.stringify({
            article_id: id
          })
        )
        .then(res => {
          this.article=res.data.result.content
          // 匹配关键字正则
          const replaceReg = new RegExp(sentence, "g");
          // 高亮替换v-html值
          const replaceString =
            '<span class="search-text">' + sentence + "</span>";
          this.article = this.article.replace(
            replaceReg,
            replaceString
          );
          this.title=title
        })
        .catch(err => {
          return false;
        });
    },
    back () {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
.active {
  background-color: antiquewhite;
}
.title {
  color: #333;
  margin-top: 10px;
  margin-left: 20px;
  font-size: 14px;
  line-height: 1.29;
  font-weight: 700;
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
</style>
