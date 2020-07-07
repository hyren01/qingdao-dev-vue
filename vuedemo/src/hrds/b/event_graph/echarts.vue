
<template>
  <div class="echartLayout " id="container3">
    <el-row>
      <el-col :span="7" style="margin-top: 20px;margin-bottom:20px;margin-left:20px">
        <el-input
          placeholder="请输入图中的左事件"
          prefix-icon="el-icon-search"
          v-model="search_source"
          size="mini"
        ></el-input>
      </el-col>
      <el-col :span="1" style="margin-top: 20px;margin-bottom:20px;margin-left:20px;">➡</el-col>
      <el-col :span="7" style="margin-top: 20px;margin-bottom:20px;margin-left:20px">
        <el-input
          placeholder="请输入图中的右事件"
          prefix-icon="el-icon-search"
          v-model="search_target"
          size="mini"
        ></el-input>
      </el-col>
      <el-col :span="6" style="margin-top: 20px;margin-bottom:20px; margin-left:20px;">
        <el-button type="primary" size="mini" @click="select()">搜索</el-button>
      </el-col>
    </el-row>
    <div
      id="container"
      style="width:100%; height:650px;margin-bottom:20px; overflow:hidden;border-radius: 4px; border: 1px solid rgba(80, 80, 80, 0.4);"
    ></div>
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
      search_source: "博尔顿表示支持",
      search_target: "支持维吾尔人集中营",
      myChart: null,
      chartData: [{	"name": "特朗普潜入\n",	"category": 1,	"value": "ccca4fbcb60a11ea91870242ac120008",	"symbolSize": 80,	"draggable": true,	"event_date": "",	"event_local": "",	"event_state": "possible",	"nentity_place": "",	"nentity_org": "",	"nentity_person": "",	"nentity_misc": ""}, {	"name": "博尔顿表示\n支持",	"category": 1,	"value": "c0c997eab60a11ea91870242ac120008",	"draggable": true,	"event_date": "周日晚上",	"event_local": "",	"event_state": "happened",	"nentity_place": "",	"nentity_org": "",	"nentity_person": "周日晚上",	"nentity_misc": ""}, {	"name": "支持维吾尔\n人集中营",	"category": 1,	"value": "cf1949b2b60a11ea91870242ac120008",	"draggable": true,	"event_date": "",	"event_local": "",	"event_state": "happening",	"nentity_place": "",	"nentity_org": "",	"nentity_person": "",	"nentity_misc": ""},  {	"name": "博尔顿接受\n",	"category": 1,	"value": "884f9e2eb60e11eaa5200242ac120008",	"draggable": true,	"event_date": "",	"event_local": "",	"event_state": "happened",	"nentity_place": "",	"nentity_org": "",	"nentity_person": "",	"nentity_misc": ""}, {	"name": "特朗普编辑\n破坏性内容\n",	"category": 1,	"value": "c48fc430b60a11ea91870242ac120008",	"draggable": true,	"event_date": "",	"event_local": "",	"event_state": "possible",	"nentity_place": "",	"nentity_org": "",	"nentity_person": "",	"nentity_misc": ""}, {	"name": "博尔顿发布\n",	"category": 1,	"value": "c5977594b60a11ea91870242ac120008",	"draggable": true,	"event_date": "",	"event_local": "",	"event_state": "possible",	"nentity_place": "",	"nentity_org": "",	"nentity_person": "",	"nentity_misc": ""}, {	"name": "特朗普不害\n怕潜入正在\n进行的案件\n",	"category": 1,	"value": "56e1a22ab60d11ea8fd80242ac120008",	"draggable": true,	"event_date": "",	"event_local": "",	"event_state": "happened",	"nentity_place": "",	"nentity_org": "",	"nentity_person": "",	"nentity_misc": ""}, {	"name": "博尔顿,特\n朗普寻求外\n国选举干预\n",	"category": 1,	"value": "d139589ab60a11ea91870242ac120008",	"draggable": true,	"event_date": "",	"event_local": "",	"event_state": "happened",	"nentity_place": "",	"nentity_org": "",	"nentity_person": "",	"nentity_misc": ""}, {	"name": "博尔顿发布\n一本含有潜\n在机密信息\n的书",	"category": 1,	"value": "cc3ce22ab60b11eabc040242ac120008",	"draggable": true,	"event_date": "",	"event_local": "",	"event_state": "possible",	"nentity_place": "",	"nentity_org": "",	"nentity_person": "",	"nentity_misc": ""}, {	"name": "沙特转移人\n们对伊万卡\n邮件的注意\n力",	"category": 1,	"value": "c0f4c2a0b60d11ea9fee0242ac120008",	"draggable": true,	"event_date": "",	"event_local": "",	"event_state": "possible",	"nentity_place": "",	"nentity_org": "",	"nentity_person": "",	"nentity_misc": ""}],
      chartLink: [{	"source": "特朗普潜入\n",	"target": "博尔顿表示\n支持",	"name": "因果关系",	"weight": 100}, {	"source": "特朗普潜入\n",	"target": "支持维吾尔\n人集中营",	"name": "因果关系",	"weight": 100},  {	"source": "特朗普潜入\n",	"target": "博尔顿表示\n支持",	"name": "因果关系",	"weight": 100}, {	"source": "特朗普不帮\n助特朗普不\n是朋友",	"target": "博尔顿表示\n支持",	"name": "因果关系",	"weight": 100},  {	"source": "博尔顿接受\n",	"target": "支持维吾尔\n人集中营",	"name": "因果关系",	"weight": 100},  {	"source": "特朗普编辑\n破坏性内容\n",	"target": "支持维吾尔\n人集中营",	"name": "因果关系",	"weight": 100}, {	"source": "特朗普不帮\n助特朗普不\n是朋友",	"target": "支持维吾尔\n人集中营",	"name": "因果关系",	"weight": 100}, {	"source": "特朗普潜入\n",	"target": "支持维吾尔\n人集中营",	"name": "因果关系",	"weight": 100}, {	"source": "博尔顿发布\n",	"target": "支持维吾尔\n人集中营",	"name": "因果关系",	"weight": 100},  {	"source": "特朗普不害\n怕潜入正在\n进行的案件\n",	"target": "支持维吾尔\n人集中营",	"name": "因果关系",	"weight": 100}, {	"source": "支持维吾尔\n人集中营",	"target": "博尔顿,特\n朗普寻求外\n国选举干预\n",	"name": "因果关系",	"weight": 100},  {	"source": "支持维吾尔\n人集中营",	"target": "博尔顿发布\n一本含有潜\n在机密信息\n的书",	"name": "因果关系",	"weight": 100}, {	"source": "支持维吾尔\n人集中营",	"target": "沙特转移人\n们对伊万卡\n邮件的注意\n力",	"name": "因果关系",	"weight": 100}, {	"source": "支持维吾尔\n人集中营",	"target": "特朗普使用\n分类和编辑\n",	"name": "因果关系",	"weight": 100}, {	"source": "博尔顿接受\n",	"target": "支持维吾尔\n人集中营",	"name": "因果关系",	"weight": 100}, {	"source": "特朗普编辑\n破坏性内容\n",	"target": "支持维吾尔\n人集中营",	"name": "因果关系",	"weight": 100}, {	"source": "特朗普不帮\n助特朗普不\n是朋友",	"target": "支持维吾尔\n人集中营",	"name": "因果关系",	"weight": 100},{	"source": "特朗普潜入\n",	"target": "支持维吾尔\n人集中营",	"name": "因果关系",	"weight": 100}, {	"source": "博尔顿发布\n",	"target": "支持维吾尔\n人集中营",	"name": "因果关系",	"weight": 100},  {	"source": "特朗普不害\n怕潜入正在\n进行的案件\n",	"target": "支持维吾尔\n人集中营",	"name": "因果关系",	"weight": 100}, {	"source": "支持维吾尔\n人集中营",	"target": "博尔顿,特\n朗普寻求外\n国选举干预\n",	"name": "因果关系",	"weight": 100},  {	"source": "支持维吾尔\n人集中营",	"target": "博尔顿发布\n一本含有潜\n在机密信息\n的书",	"name": "因果关系",	"weight": 100}, {	"source": "支持维吾尔\n人集中营",	"target": "沙特转移人\n们对伊万卡\n邮件的注意\n力",	"name": "因果关系",	"weight": 100}],
      ListAll: [],
      event_id: "",
      event_sentence: "",
      categories: [{ name: "1" }, { name: "assumption" }, { name: "hy" }],
      article: "",
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
      eventList: []
    };
  },
  mounted() {
    this.event_id = this.$route.query.event_id;
    this.event_sentence = this.$route.query.event_sentence;
    this.initEchart();
    // this.ListAll = [{"target_event_date":"","click":"0","source_event_id":"538e241680d111eaad280242ac12000a","source_event_date":"","target_event_sentence":"外交部讨论保护和撤侨所需的应急方案和军事装备支援方案","target_event_id":"5396721080d111eaad280242ac12000a","relation_name":"then","source_event_sentence":"外交部举行会议"},{"target_event_date":"","click":"0","source_event_id":"5377423280d111eaad280242ac12000a","source_event_date":"","target_event_sentence":"外交部举行会议","target_event_id":"538e241680d111eaad280242ac12000a","relation_name":"parallel","source_event_sentence":"外交部驻外同胞领事处处长李相镇飞抵约旦首都安曼"}]
  },
  methods: {
    initMethod(data, link) {
      var dom = document.getElementById("container");
      var positonsAll = document.getElementById("positonsAll");
      this.myChart = this.$echarts.init(dom, "macarons");
      this.chartData = data;
      this.chartLink = link;
      let option = {
        // title: {
        //   text: title,
        //   x: "right",
        //   y: "bottom"
        // },
        tooltip: {
          //trigger: "item",
          //formatter: "{a} : {b}"
          formatter: function(params) {
            //alert(JSON.stringify(params))
            return (
              "事件发生日期:" +
              params.data.event_date +
              "<br/>" +
              "事件发生地点:" +
              params.data.event_local +
              "<br/>" +
              "事件发生状态:" +
              params.data.event_state +
              "<br/>" +
              "命名实体-地点:" +
              params.data.nentity_place +
              "<br/>" +
              "命名实体-组织机构:" +
              params.data.nentity_org +
              "<br/>" +
              "命名实体-人物:" +
              params.data.nentity_person +
              "<br/>" +
              "命名实体-杂项:" +
              params.data.nentity_misc +
              "<br/>"
            );
            //触发之后返回的参数，这个函数是关键
            // if (params.data.category !=undefined) //如果触发节点
            //   window.open("http://www.baidu.com")
            // }
          }
        },
        color: ["#E47473", "#4990E2"],
        // toolbox: {
        //   show: true,
        //   feature: {
        //     restore: { show: true },
        //     magicType: { show: true, type: ["force", "chord"] },
        //     saveAsImage: { show: true }
        //   }
        // },
        legend: {
          x: "left",
          show: false,
          data: this.categories.map(function(a) {
            //显示策略
            return a.name;
          })
        },
        cursor: "pointer",
        series: [
          {
            type: "graph",
            layout: "force",
            //name: title,
            symbolSize: 80,
            categories: this.categories,
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 20
            },
            label: {
              show: true
              // normal: {
              //   show: true,
              //   textStyle: {
              //     fontSize: 20,
              //   }
              // }
            },
            force: {
              repulsion: 1000,
              edgeLength: 150
            },
            // itemStyle: {
            //   normal: {
            //     label: {
            //       show: true,
            //       textStyle: {
            //         color: "#333"
            //       }
            //     },
            //     nodeStyle: {
            //       brushType: "both",
            //       borderColor: "rgba(255,215,0,0.4)",
            //       borderWidth: 1
            //     },
            //     linkStyle: {
            //       type: "curve"
            //     }
            //   },
            //   emphasis: {
            //     label: {
            //       show: false
            //       // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
            //     },
            //     nodeStyle: {
            //       //r: 30
            //     },
            //     linkStyle: {}
            //   }
            // },
            lineStyle: {
              normal: {
                opacity: 0.2,
                width: 2,
                color: "#4b565b"
              }
            },
            edgeLabel: {
              normal: {
                show: true,
                formatter: function(x) {
                  return x.data.name;
                }
              }
            },
            label: {
              normal: {
                show: true,
                textStyle: {}
              }
            },
            roam: true,
            data: this.chartData,
            links: this.chartLink
          }
        ]
      };
      this.myChart.setOption(option);
      let that = this;
      this.myChart.on("click", param => {
        this.addData(this.chartData, this.chartLink, param.value);
        // this.getRelAndArticle(param.value);
      });
    },
    initEchart() {
      // functionAll
      //   .getEventRel({
      //     event_id: this.event_id
      //   })
      //   .then(res => {
      //     console.log(res);
      //     this.chartData = this.dataEChart(res.data.result_data, null,null);
      //     this.chartLink = this.linkEChart(res.data.result_link, null);
          // this.chartData = this.dataEChart(this.ListAll, null);
          // this.chartLink = this.linkEChart(this.ListAll, null);
          //   this.chartData = this.dataEChart(res.data.data.data, null);
          //   this.chartLink = this.linkEChart(res.data.data.data, null);
          this.initMethod(this.chartData, this.chartLink);
          //this.getRelAndArticle(this.event_id);
        // })
        // .catch(err => {
        //   return false;
        // });
    },
    /**
     * 数据集合
     */
    dataEChart(json, data, search_source) {
      if (data != null) {
        var datalist = data;
        for (var i = 0, l = json.length; i < l; i++) {
          var tmp = 0;
          for (var j = 0; j < datalist.length; j++) {
            if (datalist[j].value == json[i].id) {
              tmp = 1;
              break;
            }
          }
          if (tmp == 0) {
            var nodeObj = new Object();
            nodeObj.name = json[i].name;
            nodeObj.name = this.formatStr(nodeObj.name);
            nodeObj.category = 1;
            nodeObj.value = json[i].id;
            nodeObj.draggable = true;
            nodeObj.event_date = json[i].event_date;
            nodeObj.event_local = json[i].event_local;
            nodeObj.event_state = json[i].event_state;
            nodeObj.nentity_place = json[i].nentity_place;
            nodeObj.nentity_org = json[i].nentity_org;
            nodeObj.nentity_person = json[i].event_date;
            nodeObj.nentity_misc = json[i].nentity_misc;
            datalist.push(nodeObj);
          }
          //}
        }
      } else {
        if (search_source != null) {
          var datalist = new Array(json.length);
          for (var i = 0; i < json.length; i++) {
            var nodeObj = new Object();
            nodeObj.name = json[i].name;
            nodeObj.name = this.formatStr(nodeObj.name);
            nodeObj.category = 1;
            nodeObj.value = json[i].id;
            nodeObj.draggable = true;
            nodeObj.event_date = json[i].event_date;
            nodeObj.event_local = json[i].event_local;
            nodeObj.event_state = json[i].event_state;
            nodeObj.nentity_place = json[i].nentity_place;
            nodeObj.nentity_org = json[i].nentity_org;
            nodeObj.nentity_person = json[i].event_date;
            nodeObj.nentity_misc = json[i].nentity_misc;
            datalist[i] = nodeObj;
          }
        } else {
          var datalist = new Array(json.length);
          for (var i = 0; i < json.length; i++) {
            if (json[i].id == this.event_id) {
              var nodeObj = new Object();
              nodeObj.name = this.event_sentence;
              nodeObj.name = this.formatStr(nodeObj.name);
              nodeObj.category = 0;
              nodeObj.value = this.event_id;
              nodeObj.symbolSize = 100;
              nodeObj.draggable = true;
              nodeObj.event_date = json[i].event_date;
              nodeObj.event_local = json[i].event_local;
              nodeObj.event_state = json[i].event_state;
              nodeObj.nentity_place = json[i].nentity_place;
              nodeObj.nentity_org = json[i].nentity_org;
              nodeObj.nentity_person = json[i].event_date;
              nodeObj.nentity_misc = json[i].nentity_misc;
              datalist[i] = nodeObj;
              //this.eventList[i] = this.event_id;
              continue;
            }
            var nodeObj = new Object();
            nodeObj.name = json[i].name;
            nodeObj.name = this.formatStr(nodeObj.name);
            nodeObj.category = 1;
            nodeObj.value = json[i].id;
            nodeObj.draggable = true;
            nodeObj.event_date = json[i].event_date;
            nodeObj.event_local = json[i].event_local;
            nodeObj.event_state = json[i].event_state;
            nodeObj.nentity_place = json[i].nentity_place;
            nodeObj.nentity_org = json[i].nentity_org;
            nodeObj.nentity_person = json[i].event_date;
            nodeObj.nentity_misc = json[i].nentity_misc;
            datalist[i] = nodeObj;
          }
        }
      }
      return datalist;
    },
    /**
     * 关系数据集合
     */
    linkEChart(json, link) {
      if (link != null) {
        var dataLink = link;
        for (var i = 0, l = json.length; i < l; i++) {
          //for(var key in json.event[i]){
          //alert(key+':'+json.event[i][key]);
          var obj = new Object();
          obj.source = json[i].source_event_sentence;
          obj.target = json[i].target_event_sentence;
          obj.source = this.formatStr(obj.source);
          obj.target = this.formatStr(obj.target);
          obj.name = this.formatre(json[i].relation_name);
          obj.weight = 100;
          link.push(obj);
          //}
        }
      } else {
        //let json ={"status":"success","event":[{"event_sentence":"测试1","event_id":"111","event_date":"20200327"},{"event_sentence":"测试2","event_id":"112","event_date":"20200327"}]};
        var dataLink = new Array(json.length);
        for (var i = 0, l = json.length; i < l; i++) {
          //for(var key in json.event[i]){
          //alert(key+':'+json.event[i][key]);
          var obj = new Object();
          obj.source = json[i].source_event_sentence;
          obj.target = json[i].target_event_sentence;
          obj.source = this.formatStr(obj.source);
          obj.target = this.formatStr(obj.target);
          obj.name = this.formatre(json[i].relation_name);
          obj.weight = 100;
          dataLink[i] = obj;
          //}
        }
        // let dataLink=[
        //   {value: "同事",source: "1",target: "2"},
        //   {value: "同事",source: "1",target: "3"},
        //   {value: "同事",source: "1",target: "4"},
        //   {value: "同学",source: "1",target: "5"},
        //   {value: "同学",source: "1",target: "6"},
        //   {value: "同学",source: "1",target: "7"},
        //   {value: "爸爸",source: "1",target: "8"},
        // ];
      }
      return dataLink;
    },
    addData(data, link, event_id) {
      functionAll
        .getEventRel({
          event_id: event_id
        })
        .then(res => {
          this.chartData = this.dataEChart(res.data.result_data, data,null);
          this.chartLink = this.linkEChart(res.data.result_link, link);
          this.initMethod(this.chartData, this.chartLink);
        })
        .catch(err => {
          return false;
        });
    },
    select() {
      // functionAll
      //   .getEventToEvent({
      //     event_source_sentence: this.search_source,
      //     event_target_sentence: this.search_target
      //   })
      //   .then(res => {
      //     this.chartData = [];
      //     this.chartLink = [];
      //     this.chartData = this.dataEChart(res.data.result_data,null,this.search_source);
      //     this.chartLink = this.linkEChart(res.data.result_link, null);
      //     this.initMethod(this.chartData, this.chartLink);
      //   })
      //   .catch(err => {
      //     return false;
      //   });
    },
    formatStr(str) {
      return str
        .replace(/[^\x00-\xff]/g, "$&\x01")
        .replace(/.{9}\x01?/g, "$&\n")
        .replace(/\x01/g, "");
    },
    formatre(name) {
      if (name == "assumption") {
        return "假设关系";
      } else if (name == "causality") {
        return "因果关系";
      } else if (name == "choice") {
        return "选择关系";
      } else if (name == "condition") {
        return "条件关系";
      } else if (name == "contrast") {
        return "反转关系";
      } else if (name == "further") {
        return "递进关系";
      } else if (name == "hypernym") {
        return "上下位关系";
      } else if (name == "parallel") {
        return "并列关系";
      } else if (name == "then") {
        return "顺承关系";
      } else {
        return name;
      }
    }
  }
};
</script>

<style scoped>
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