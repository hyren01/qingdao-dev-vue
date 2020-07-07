<template>
<div id="container3">
    <el-row>
        <el-col :span="10" style="margin-top: 20px;margin-bottom:20px;margin-left:0px">
            <el-input placeholder="请输入搜索信息" prefix-icon="el-icon-search" v-model="search" size="medium"></el-input>
        </el-col>
        <el-col :span="6" style="margin-top: 20px;margin-bottom:20px; margin-left:10px;">
            <el-button type="primary" size="medium" @click="select()">搜索</el-button>
        </el-col>
    </el-row>
    <el-col :span="15">
        <h3>相似事件</h3>
        <el-col class="elCol8" :span="12" v-for="(item,index) in tableData" :key="index">
            <i class="el-icon-info elicon" :id="item.event_id"></i><span @click="getEventRel(item)">{{item.event_sentence}}</span>
        </el-col>
    </el-col>

    <el-col :span="9" class="col8el" style="border-left:1px solid #e6e6ee">
        <el-row>
            <h3 style="margin-left:8%">学习来源</h3>
        </el-row>
        <el-col :span="spanNubers">
            <div class="divImgs" v-for=" (item,index) in ListAll" :key="index">
                <div class="cssimg"></div>
            </div>
        </el-col>
        <el-col :span="spanNumber" :offset="offsetNum">
            <div :class="item.click == '1'&& item.click !=undefined ? 'infoAll1':'infoALL'" v-for=" (item,index) in ListAll" :key="index" @mouseover="hoveLIn(index,item.event_ids,0)">
                <div class="atitlleinfo">
                    <el-tooltip effect="dark" :content="item.translated_title" placement="top">
                        <h3 class="infoALLp1" @click="getArticleInfo(item)">{{item.translated_title}}</h3>
                    </el-tooltip>
                    <p>2010-10-24 <span>新浪财经</span></p>
                </div>
                <div class="inContent" style="height:42px;">
                    <span>在特朗普发动政治战争的同时，亚洲也出现了危险的冲突在特朗普发动政治战争的同时，亚洲也出现了危险的冲突在特朗普发动政治战争的同时，亚洲也出现了危险的冲突</span>
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
            spanNumber: 22,
            offsetNum: 2,
            spanNubers: 0,
            tableData: [],
            eventIdList: [],
            line: []
        };
    },
    mounted() {

    },
    methods: {
        hoveLIn(i, event_ids, number) {
            //将事件id相同的连线
            var line;
            var arrs = []
            event_ids.forEach(item => {
                if (document.getElementById(item.event_id) != undefined) {
                    arrs.push(
                        line = LeaderLine.setLine(
                            document.getElementsByClassName("infoALL")[i],
                            document.getElementById(item.event_id), {
                                hide: true
                            }
                        )
                    );
                    line.size = 1;
                    line.color = '#3A8EE6';
                    line.setOptions({
                        startSocket: 'left',
                        endSocket: 'bottom',
                        startPlug: 'square',
                        endPlug: 'disc'
                    })
                    // 显示连线
                    if (number == 0) {
                        arrs.forEach(item => {
                            item.show('draw', {
                                duration: 1000,
                                timing: [0.58, 0, 0.42, 1]
                            });

                        })
                    }
                }
            });
            // 监听鼠标事件隐藏连线
            document.getElementsByClassName("infoALL")[i].addEventListener('mouseleave', function () {
                arrs.forEach(item => {
                    item.hide(
                        'fade', {
                            duration: 600,
                            timing: 'linear'
                        }
                    );
                })
            }, false);
            // 监听文件列表滚动事件
            document.querySelector(".col8el").addEventListener('scroll', function () {
                arrs.forEach(item => {
                    item.position();
                })
            }, false);
            // 监听整个滚动事件
            window.addEventListener('scroll', function () {
                arrs.forEach(item => {
                    item.position();
                })
            }, false);
        },
        getArticleInfo(item) {
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
                        })
                        .catch(err => {
                            return false;
                        });
                })
                //   // }
                // })
                .catch(err => {});
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

.infoALL {
    width: 100%;
    height: 60px;
    background-color: #fff !important;
    margin-top: 10px;
    font-size: 12px;
    padding: 0 !important;
    background-image: none !important;
    position: relative;
    border-radius: 4px;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, .04);
    border: 1px solid #e6e6ee;
}

.infoALL:first-child {
    height: 60px;
    width: 100%;
    background-color: #fff !important;
    margin-top: 0px;
    font-size: 12px;
    padding: 0 !important;
    background-image: none !important;
    border-radius: 4px;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, .04);
    border: 1px solid #e6e6ee;
}

.infoALL:hover {
    border: 2px solid #3A8EE6;
}

.infoAll1 {
    width: 100%;
    height: 62px;
    background-color: #e6e6ee;
    margin-top: 10px;
    font-size: 12px;
    padding: 2px 2px 2px 6px;
    position: relative;
    border: 2px solid #1296db;
}

.infoAll1:first-child {
    height: 62px;
    width: 100%;
    background-color: #e6e6ee;
    margin-top: 0px;
    font-size: 12px;
    padding: 2px 2px 2px 6px;
    border: 2px solid #1296db;
}

.infoALLp1 {
    width: 200px;
    float: left;
    margin: 2px 2px 2px 6px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
    color: #0b66d1;
    font-size: 14px;
    /* line-height: 12px; */
}

/* .infoALLp1:hover {
    color: #3A8EE6;
} */

.infoALLp2 {
    margin: 2px 2px 2px 6px;
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

.elCol8 {
    height: 36px;
    text-align: left;
    margin-bottom: 10px;
    /* float: left;
    margin: 2px 2px 2px 16px; */
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.elCol8 span {
    color: #666;
    cursor: pointer;
}

.elCol8 span:hover {
    color: #0b66d1;
    cursor: pointer;
}

#container3 h3 {
    margin-bottom: 10px;
}

.elicon {
    color: #666;
    margin-right: 4px;
    font-size: 18px;
}

.atitlleinfo {
    height: 30px;
    line-height: 30px;
    overflow: hidden;
}

.atitlleinfo p {
    width: 140px;
    float: right;
    margin-right: 6px;
    color: #666;
}

.atitlleinfo span {
    margin-left: 4px;
}

.inContent {
    height: 30px;
}

.inContent span {
    width: 90%;
    float: left;
    margin: 2px 2px 2px 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #666;
    font-size: 12px;
}
</style>
