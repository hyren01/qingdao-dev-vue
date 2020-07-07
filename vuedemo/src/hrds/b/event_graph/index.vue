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
                    <p>{{item.spider_time}} <span>{{item.source}}</span></p>
                </div>
                <div class="inContent" style="height:42px;">
                    <span>{{item.summary[0]}},{{item.summary[1]}}</span>
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
            ListAll: [{"article_id":"0b2f7e68982616461cfdf48f65c86379","summary":["并表示美国总统唐纳德·特朗普一直公开要求包括乌克兰和中国在内的外国政府调查美国总统唐纳德·特朗普的政绩","“继续鼓励外国政府干预美国大选是美国总统唐纳德·特朗普（Donald Trump）为个人和政治利益继续滥用美国总统唐纳德·特朗普（Donald Trump）权力的明显危险”"],"spider_time":"2019-12-05 12:21:48","translated_title":"美国众议院情报委员会弹劾报告“特朗普的违法行为，妨碍司法的行为压倒性”. ","event_ids":[{"event_id":"4fc7d010bb8311ea9b0d0242ac120008"},{"event_id":"5153ae36bb8311eab1300242ac120008"},{"event_id":"577c50d8bb8311ea891e0242ac120008"},{"event_id":"5a523e4ebb8311ea85830242ac120008"},{"event_id":"5b6854c6bb8311eabb7f0242ac120008"},{"event_id":"6017fbdebb8311eaab400242ac120008"},{"event_id":"62bef6dabb8311eaa19f0242ac120008"},{"event_id":"6417d45cbb8311eaa19f0242ac120008"},{"event_id":"658e7ce6bb8311eab0a30242ac120008"},{"event_id":"667a5792bb8311eab0a30242ac120008"},{"event_id":"6b1d4796bb8311ea837d0242ac120008"},{"event_id":"6c8a0a24bb8311ea837d0242ac120008"},{"event_id":"6e42f83abb8311ea837d0242ac120008"},{"event_id":"70f1a324bb8311eaa4720242ac120008"},{"event_id":"718446a2bb8311eaa4720242ac120008"},{"event_id":"730082b6bb8311ea89020242ac120008"},{"event_id":"755fcd32bb8311ea89020242ac120008"},{"event_id":"7821a568bb8311eaac1b0242ac120008"},{"event_id":"7a74cd54bb8311eaac1b0242ac120008"},{"event_id":"7afb0158bb8311eaac1b0242ac120008"},{"event_id":"7c55137cbb8311ea8d830242ac120008"},{"event_id":"8387eaf2bb8311eabcbd0242ac120008"},{"event_id":"86a5a83cbb8311eabcbd0242ac120008"},{"event_id":"9ab7d9dcb9c911ea83d80242ac120008"}],"source":"yna"},{"article_id":"315d3dd194f945423b18a067a55d6ae4","summary":["特朗普曾表示博尔顿不希望他的书在大选前出版","特朗普是一本关于如何摆布博尔顿的公开书"],"spider_time":"2020-06-22 20:18:05","translated_title":"博尔顿书的正确书名","event_ids":[{"event_id":"45dc23ceb60311ea9e7e0242ac120008"},{"event_id":"fb4bd91ab60e11eabc260242ac120008"},{"event_id":"c1410d2eb60b11eab62b0242ac120008"},{"event_id":"c0f4c2a0b60d11ea9fee0242ac120008"},{"event_id":"aaad1536b60a11eab8f80242ac120008"},{"event_id":"c2e952a4b60a11ea91870242ac120008"},{"event_id":"ae30dc20b60e11ea8c370242ac120008"},{"event_id":"97e72f76b60b11ea8f9d0242ac120008"},{"event_id":"86ce23a0b60d11eaa16f0242ac120008"},{"event_id":"ec6be136b60b11ea9f080242ac120008"},{"event_id":"477bb104b60311ea959e0242ac120008"},{"event_id":"fd6a307ab60e11eaa5f50242ac120008"},{"event_id":"c808f226b60a11ea91870242ac120008"},{"event_id":"710bf7d8b60b11eab2fe0242ac120008"},{"event_id":"a16a1e88b60a11eaa7740242ac120008"},{"event_id":"52edf3f8b60311eaaf760242ac120008"},{"event_id":"0032e3f6b60f11ea82f20242ac120008"},{"event_id":"008e2784b60f11ea82f20242ac120008"},{"event_id":"f7cd576eb60e11ea99370242ac120008"},{"event_id":"ce48e95cb60a11ea91870242ac120008"},{"event_id":"53804bc2b60311eaaf760242ac120008"},{"event_id":"cd520f7eb60a11ea91870242ac120008"},{"event_id":"508e1020b60311ea81450242ac120008"},{"event_id":"2ceab53eb60c11eaae5e0242ac120008"},{"event_id":"5244ec7cb60311eaaf760242ac120008"},{"event_id":"d1d90a48b60a11ea91870242ac120008"},{"event_id":"c53793f4b60a11ea91870242ac120008"},{"event_id":"ae4baed2b60a11eaa7f20242ac120008"},{"event_id":"cfac796cb60a11ea91870242ac120008"},{"event_id":"a82ee0f0b60a11eaa6860242ac120008"},{"event_id":"884f9e2eb60e11eaa5200242ac120008"},{"event_id":"f412d806b60e11ea97440242ac120008"},{"event_id":"d139589ab60a11ea91870242ac120008"},{"event_id":"8698eafab60d11eaa16f0242ac120008"},{"event_id":"4f38db56b60311eabff20242ac120008"},{"event_id":"0136eda2b60e11eab4b70242ac120008"},{"event_id":"56e1a22ab60d11ea8fd80242ac120008"},{"event_id":"cf1949b2b60a11ea91870242ac120008"},{"event_id":"c48fc430b60a11ea91870242ac120008"},{"event_id":"fdc2e784b60d11ea90130242ac120008"},{"event_id":"c5977594b60a11ea91870242ac120008"},{"event_id":"273de4f6b60e11ea8d180242ac120008"},{"event_id":"a38e201ab60a11ea980b0242ac120008"},{"event_id":"a63dff6ab60a11eaba1f0242ac120008"},{"event_id":"b0f1bc5ab60d11ea87890242ac120008"},{"event_id":"f7301210b60e11eaa4040242ac120008"},{"event_id":"af1a1164b60a11eaa7f20242ac120008"},{"event_id":"fc7bc412b60e11eabfbe0242ac120008"},{"event_id":"c70fd7feb60a11ea91870242ac120008"},{"event_id":"c0e12288b60b11eab62b0242ac120008"},{"event_id":"a22b65d4b60a11eaa7740242ac120008"},{"event_id":"cdcc069eb60a11ea91870242ac120008"},{"event_id":"c6ae6b7cb60a11ea91870242ac120008"},{"event_id":"714ba432b60b11eab2fe0242ac120008"},{"event_id":"01939150b60f11ea96d00242ac120008"},{"event_id":"c0c997eab60a11ea91870242ac120008"},{"event_id":"c9b380f0b60a11ea91870242ac120008"},{"event_id":"14b06cd0b60b11ea9d6d0242ac120008"},{"event_id":"4728b0e4b60d11ea85b70242ac120008"},{"event_id":"aae10436b60a11eab8f80242ac120008"},{"event_id":"4a7e143cb60311eabf2c0242ac120008"},{"event_id":"febd326ab60e11ea91120242ac120008"},{"event_id":"f9206336b60e11ea87d30242ac120008"},{"event_id":"d0883cccb60a11ea91870242ac120008"},{"event_id":"c00febbeb60b11eab62b0242ac120008"},{"event_id":"ccca4fbcb60a11ea91870242ac120008"},{"event_id":"a7fbbde2b60a11eaa6860242ac120008"},{"event_id":"9c37d51eb60e11ea83ba0242ac120008"},{"event_id":"4b063164b60311eabf2c0242ac120008"},{"event_id":"cc3ce22ab60b11eabc040242ac120008"},{"event_id":"be90ceb2b60a11ea91870242ac120008"},{"event_id":"fc940ba2b60a11ea89e90242ac120008"},{"event_id":"c360e5a6b60c11eab6930242ac120008"},{"event_id":"ec22909eb60b11ea9f080242ac120008"},{"event_id":"cb193444b60a11ea91870242ac120008"},{"event_id":"fa522942b60e11ea93e00242ac120008"},{"event_id":"f1e80e7ab60e11eaa4be0242ac120008"},{"event_id":"4c804d5eb60311eaa2940242ac120008"},{"event_id":"4eaaa9b2b60311eabff20242ac120008"},{"event_id":"e545d17ab60e11ea81e20242ac120008"},{"event_id":"eb362b34b60e11ea985f0242ac120008"},{"event_id":"9c7dc23cb60d11ea8c870242ac120008"},{"event_id":"82569ac4b60c11ea8add0242ac120008"},{"event_id":"5ca63432b60d11eabc960242ac120008"},{"event_id":"ca94b728b60a11ea91870242ac120008"}],"source":"cnn"},{"article_id":"a3cf610293681da5fdc3f111ed56497a","summary":["约翰·博尔顿写道:“特朗普告诉蓬佩奥打电话给拉夫罗夫","约翰·博尔顿在一本关于约翰·博尔顿担任唐纳德·特朗普总统国家安全顾问期间的新书中详述了一系列令人不安和令人震惊的指控"],"spider_time":"2020-06-18 20:28:38","translated_title":"我们从约翰·博尔顿令人瞠目结舌的与特朗普共事的故事中学到了什么","event_ids":[{"event_id":"4f89d7e4b9d311eaabde0242ac120008"},{"event_id":"50a2fa98b9d311eaabde0242ac120008"},{"event_id":"51458edeb9d311eaabde0242ac120008"},{"event_id":"5284b676b9d311ea8ca70242ac120008"},{"event_id":"55b1df9ab9d311ea9d160242ac120008"},{"event_id":"56c1178eb9d311ea9d160242ac120008"},{"event_id":"58a36a0cb9d311eaba5e0242ac120008"},{"event_id":"5b58f10eb9d311ea821a0242ac120008"},{"event_id":"606c3ffcb9d311eaa9b70242ac120008"},{"event_id":"60c150fab9d311eaa9b70242ac120008"},{"event_id":"61583ff6b9d311eaa9b70242ac120008"},{"event_id":"644330b8b9d311eaa1d20242ac120008"},{"event_id":"64a0e794b9d311eaa1d20242ac120008"},{"event_id":"696a158eb9d311eaa2020242ac120008"},{"event_id":"6d28fd0cb9d311ea83900242ac120008"},{"event_id":"6ecfcc44b9d311ea9acb0242ac120008"},{"event_id":"6f3a63b0b9d311ea9acb0242ac120008"},{"event_id":"728307feb60211ea97730242ac120008"},{"event_id":"7481b0f8b9d311eaa8140242ac120008"},{"event_id":"7523733eb9d311eaa8140242ac120008"},{"event_id":"7a8a539cb9d311eab6e60242ac120008"},{"event_id":"7b979c72b9d311eab6e60242ac120008"},{"event_id":"7c89605cb9d311eab6e60242ac120008"},{"event_id":"7e34c90ab9d311eabd890242ac120008"},{"event_id":"801fa384b9d311eaa2af0242ac120008"},{"event_id":"8182894eb9d311eabfd90242ac120008"},{"event_id":"83f41e72b9d311ea94d90242ac120008"},{"event_id":"84e5c628b9d311ea95810242ac120008"},{"event_id":"860a56f4b9d311eab16c0242ac120008"},{"event_id":"87596252b9d311eaab980242ac120008"},{"event_id":"8a87e53eb9d311eabc9a0242ac120008"},{"event_id":"8af6cb34b9d311eabc9a0242ac120008"},{"event_id":"8b35da0eb9d311eabc9a0242ac120008"},{"event_id":"8c643380b9d311eaa8d40242ac120008"},{"event_id":"8df3f9bab9d311eaa5540242ac120008"},{"event_id":"906cfa98b9d311ea87530242ac120008"},{"event_id":"91681022b9d311ea87530242ac120008"},{"event_id":"9216cea0b9d311ea87530242ac120008"},{"event_id":"948afa44b9d311eaada40242ac120008"},{"event_id":"9551e1eab9d311eaada40242ac120008"},{"event_id":"95cea178b9c211ea87990242ac120008"},{"event_id":"97885f0cb9d311ea91bd0242ac120008"},{"event_id":"97f0b200b9d311ea91bd0242ac120008"},{"event_id":"98b7b382b9d311eab1dc0242ac120008"},{"event_id":"9a67c992b9d311ea8a490242ac120008"},{"event_id":"9b585bc8b9d311ea8a490242ac120008"},{"event_id":"9d3cc082b9d311ea86e10242ac120008"},{"event_id":"9db4efeeb9d311ea86e10242ac120008"},{"event_id":"9f251886b9d311ea99b50242ac120008"},{"event_id":"a0c8d72cb9d311ea96220242ac120008"},{"event_id":"a27477d4b9d311eab4380242ac120008"},{"event_id":"afac712ab9c111eaab050242ac120008"},{"event_id":"b36577c6b9c111ea90800242ac120008"},{"event_id":"d0f45af4b9d111eaa6470242ac120008"}],"source":"cnn"},{"article_id":"afee45bafa4c9b993b979f95c696a355","summary":["特朗普表示不会在塔尔萨集会上戴面具:“不是为了抗议","特朗普表示不会在塔尔萨集会上戴面具:“不是为了抗议"],"spider_time":"2020-06-21 12:17:03","translated_title":"特朗普在俄克拉荷马州塔尔萨举行集会","event_ids":[{"event_id":"00193a30b9bd11eab5d20242ac120008"},{"event_id":"013c77dcb9be11eab66b0242ac120008"},{"event_id":"032c2f10b9be11eaae980242ac120008"},{"event_id":"04609628b9be11eaae980242ac120008"},{"event_id":"06061ff2b9be11eaa3d70242ac120008"},{"event_id":"0811d228b9be11ea91190242ac120008"},{"event_id":"087135bab9be11ea91190242ac120008"},{"event_id":"0a794294b9be11ea9c4a0242ac120008"},{"event_id":"0c39e796b9be11eab4ae0242ac120008"},{"event_id":"0ca8f506b9bd11ea93930242ac120008"},{"event_id":"0dfcb928b9be11eab4ae0242ac120008"},{"event_id":"0f495f02b9be11ea9b840242ac120008"},{"event_id":"11f9622eb9be11eaae790242ac120008"},{"event_id":"13041222b9be11eaae790242ac120008"},{"event_id":"138d33eab9be11eaae790242ac120008"},{"event_id":"1535b898b9be11eaa9860242ac120008"},{"event_id":"15a76056b9be11eaa9860242ac120008"},{"event_id":"171df4e0b9be11ea8d300242ac120008"},{"event_id":"177be258b9be11ea8d300242ac120008"},{"event_id":"17d7889ab9bb11eaa4f10242ac120008"},{"event_id":"19762596b9be11ea88fc0242ac120008"},{"event_id":"19c8cca6b9be11ea88fc0242ac120008"},
            {"event_id":"1b61a93eb9be11ea86bf0242ac120008"},
            {"event_id":"1ce1435ab9be11ea86bf0242ac120008"},{"event_id":"1db5206ab9bb11eab5f70242ac120008"},{"event_id":"1e191d6ab9be11eaa0430242ac120008"},{"event_id":"1ecbe6f2b9be11eaa0430242ac120008"},{"event_id":"1fbe162cb9bc11ea964e0242ac120008"},{"event_id":"256c71c8b9bb11ea88f00242ac120008"},{"event_id":"26edc3bcb9bb11eab1700242ac120008"},{"event_id":"28aa9f76b9bc11ea93e20242ac120008"},{"event_id":"2cf215e0b9bd11ea972f0242ac120008"},{"event_id":"2f6675aab9bd11eaadba0242ac120008"},{"event_id":"31e36696b9bb11ea983f0242ac120008"},{"event_id":"332d09c4b9bd11eab8a60242ac120008"},{"event_id":"33463e96b9bb11eab17e0242ac120008"},{"event_id":"35b03112b9bd11ea8da20242ac120008"},{"event_id":"37a253bab9bd11ea8da20242ac120008"},{"event_id":"397da07cb9bd11ea94c00242ac120008"},{"event_id":"39d5ff44b9bb11eaa3be0242ac120008"},{"event_id":"3a819726b9bd11ea94c00242ac120008"},{"event_id":"3b58c07cb9bb11eab48c0242ac120008"},{"event_id":"3d723b48b9bd11ea82650242ac120008"},{"event_id":"4040a8deb9bb11eab44b0242ac120008"},{"event_id":"40ae828ab9bd11ea94050242ac120008"},{"event_id":"40ee4258b9bd11ea94050242ac120008"},{"event_id":"424b0b24b9bb11ea92110242ac120008"},{"event_id":"4380dec2b9bd11ea9acb0242ac120008"},{"event_id":"441a6ba0b9bd11ea9acb0242ac120008"},{"event_id":"454a9630b9bd11ea8d8e0242ac120008"},{"event_id":"475ce312b9bb11eabd580242ac120008"},{"event_id":"4954dab0b9bd11ea91660242ac120008"},{"event_id":"4aafbb5ab9bd11ea91660242ac120008"},{"event_id":"4b47a79eb9bd11ea91660242ac120008"},{"event_id":"4cba14a0b9bc11eabf3c0242ac120008"},{"event_id":"4cf6426cb9bd11eaa64d0242ac120008"},{"event_id":"4f3cce42b9bd11eab4860242ac120008"},{"event_id":"51b5f1f8b9bd11eaa9510242ac120008"},{"event_id":"527bdcdab9bb11eaac490242ac120008"},{"event_id":"5351f2fab9bd11ea9a710242ac120008"},{"event_id":"54aff54ab9bb11ea92d20242ac120008"},{"event_id":"54cd3cc0b9bd11eaa96e0242ac120008"},{"event_id":"5519bbe2b9bb11ea92d20242ac120008"},{"event_id":"562aa6fcb9bd11ea8a7c0242ac120008"},{"event_id":"5976ec4eb9bd11ea812f0242ac120008"},{"event_id":"5aab245eb9bd11ea812f0242ac120008"},{"event_id":"5b0766f6b9bd11ea812f0242ac120008"},{"event_id":"5de8acfeb9bd11eaa12f0242ac120008"},{"event_id":"5e870a02b9bd11eaa12f0242ac120008"},{"event_id":"5edcf1e2b9bd11eaa12f0242ac120008"},{"event_id":"5fe41110b9bd11ea94640242ac120008"},{"event_id":"63c0bbbcb9bd11eaaeca0242ac120008"},{"event_id":"64f7a202b9bd11eaaeca0242ac120008"},{"event_id":"6534cf1ab9bd11eaaeca0242ac120008"},{"event_id":"65bfb744b9bb11ea97ae0242ac120008"},{"event_id":"661d4e2cb9bb11ea97ae0242ac120008"},{"event_id":"684ab106b9bd11eab6fc0242ac120008"},{"event_id":"68a97d44b9bd11eab6fc0242ac120008"},{"event_id":"69fb646eb9bd11ea826e0242ac120008"},{"event_id":"6c027ba8b9bd11ea98700242ac120008"},{"event_id":"6db1a942b9bd11ea9d6c0242ac120008"},{"event_id":"6ea5539eb9bd11eab3690242ac120008"},{"event_id":"7010a22eb9bd11ea9ee10242ac120008"},{"event_id":"722ecf54b9bd11eabd2f0242ac120008"},{"event_id":"72ff3eb4b9bd11eabd2f0242ac120008"},{"event_id":"742bfd0eb9bd11ea83200242ac120008"},{"event_id":"75fbb1ecb9bd11eaa3930242ac120008"},{"event_id":"760568e6b9bc11eaa1fb0242ac120008"},{"event_id":"76dc5b80b9bc11eaa1fb0242ac120008"},{"event_id":"76de22deb9bd11eaa3930242ac120008"},{"event_id":"787ff4e6b9bd11ea88660242ac120008"},{"event_id":"794931d0b9bd11ea88660242ac120008"},{"event_id":"7a9ca404b9bd11ea96d70242ac120008"},{"event_id":"7af5df06b9bd11ea96d70242ac120008"},{"event_id":"7c11ec1ab9bb11ea8b8a0242ac120008"},{"event_id":"7c1d5a3ab9bd11eab8600242ac120008"},{"event_id":"7d761638b9bd11eaa6090242ac120008"},{"event_id":"7e8c5136b9bd11eab4f10242ac120008"},{"event_id":"7ed34d62b9bc11ea90a80242ac120008"},{"event_id":"7f94e54eb9bc11ea90a80242ac120008"},{"event_id":"80015c34b9bb11ea94f60242ac120008"},{"event_id":"80b36f12b9bd11eab3950242ac120008"},{"event_id":"81ebe0beb9bb11ea8f430242ac120008"},{"event_id":"8359c702b9bd11eabef10242ac120008"},{"event_id":"855cc1d2b9bb11eabb1d0242ac120008"},{"event_id":"85889e36b9bd11ea97bf0242ac120008"},{"event_id":"8648d9e6b9bb11eabb1d0242ac120008"},{"event_id":"87180570b9bd11eabeb80242ac120008"},{"event_id":"8788ec06b9bb11eabede0242ac120008"},{"event_id":"87eaef90b9bc11eab4d30242ac120008"},{"event_id":"883983cab9bd11eabfbb0242ac120008"},{"event_id":"88f08facb9bd11eabfbb0242ac120008"},{"event_id":"89574abeb9bb11eaaf9c0242ac120008"},{"event_id":"89f92af8b9bd11ea8e340242ac120008"},{"event_id":"8a89af44b9bb11eaaf9c0242ac120008"},{"event_id":"8b949ce4b9bd11ea89950242ac120008"},{"event_id":"8d38920ab9bb11eaac1d0242ac120008"},{"event_id":"8e049aa8b9bb11eaac1d0242ac120008"},{"event_id":"8e6ae658b9bd11eabd820242ac120008"},{"event_id":"8f3b793cb9bb11ea83650242ac120008"},{"event_id":"8fcd6052b9bd11eabd820242ac120008"},{"event_id":"9094f982b9bd11eabd820242ac120008"},{"event_id":"90db3dfcb9bd11eabd820242ac120008"},{"event_id":"924a76beb9bb11ea8cbe0242ac120008"},{"event_id":"92b988e6b9bc11eaba330242ac120008"},{"event_id":"92e2897ab9bd11eaa57c0242ac120008"},{"event_id":"93897aacb9bb11ea95480242ac120008"},{"event_id":"9436b0dab9bd11eaa57c0242ac120008"},{"event_id":"947c038ab9bb11ea9cfa0242ac120008"},{"event_id":"94835142b9bd11eaa57c0242ac120008"},{"event_id":"970e4660b9bd11eaa0e40242ac120008"},{"event_id":"9782889ab9bd11eaa0e40242ac120008"},{"event_id":"98c04690b9bb11eaa8950242ac120008"},{"event_id":"991e8b24b9bb11eaa8950242ac120008"},{"event_id":"99b8f360b9bd11eaa4d50242ac120008"},{"event_id":"9a3b3b42b9bb11eabb8f0242ac120008"},{"event_id":"9bcf23ceb9bb11eabb8f0242ac120008"},{"event_id":"9bf9d5ccb9bd11eaac3b0242ac120008"},{"event_id":"9c8e0f50b9bb11eaa81d0242ac120008"},{"event_id":"9e29c39ab9bb11ea84bf0242ac120008"},{"event_id":"9f3eab4ab9bd11eaa8cd0242ac120008"},{"event_id":"a022778cb9bb11eabc7d0242ac120008"},{"event_id":"a07d8684b9bd11eaa7450242ac120008"},{"event_id":"a105fb24b9bb11eabc7d0242ac120008"},{"event_id":"a28b80d6b9bb11ea8ce10242ac120008"},{"event_id":"a2edc8dab9bc11eab4550242ac120008"},{"event_id":"a3b9ce20b9bd11ea9e4c0242ac120008"},{"event_id":"a3fb7476b9bb11eabcaa0242ac120008"},{"event_id":"a58277acb9bd11ea9e4c0242ac120008"},{"event_id":"a5932d1ab9bb11eaa35a0242ac120008"},{"event_id":"a5d1f710b9bc11ea86120242ac120008"},{"event_id":"a70dacfab9bc11ea86120242ac120008"},{"event_id":"a7b5c222b9bd11ea9ff10242ac120008"},{"event_id":"a7d2115eb9bb11eabbab0242ac120008"},{"event_id":"a83318eab9bc11eab9250242ac120008"},{"event_id":"a8437376b9bb11eabbab0242ac120008"},{"event_id":"a971ad56b9bd11eab6bf0242ac120008"},{"event_id":"a99ed58ab9bb11eab86b0242ac120008"},{"event_id":"aabf7168b9bb11eaabe80242ac120008"},{"event_id":"aac18c54b9bc11ea98b10242ac120008"},{"event_id":"ab289dbcb9bd11ea95ac0242ac120008"},{"event_id":"ac306f60b9bc11eaa3c30242ac120008"},{"event_id":"ac58b7e4b9bd11eaabb70242ac120008"},{"event_id":"ac8efe82b9bb11ea87450242ac120008"},{"event_id":"ada9dd62b9bd11ea9b460242ac120008"},{"event_id":"adbbb470b9bc11ea81a60242ac120008"},{"event_id":"ae80b964b9bc11ea81a60242ac120008"},{"event_id":"afcdfb92b9bc11ea88270242ac120008"},{"event_id":"b009371ab9bd11eabbef0242ac120008"},{"event_id":"b0bc7494b9bb11eaa2700242ac120008"},{"event_id":"b0d14472b9bc11ea88270242ac120008"},{"event_id":"b1ed502cb9bb11eaa2700242ac120008"},{"event_id":"b286c536b9bb11eaa2700242ac120008"},{"event_id":"b3b38e84b9bc11ea874b0242ac120008"},{"event_id":"b461e370b9bd11eabe1f0242ac120008"},{"event_id":"b469cf92b9bb11ea88c00242ac120008"},{"event_id":"b510cafeb9bb11ea88c00242ac120008"},{"event_id":"b58829dab9bd11eabe1f0242ac120008"},{"event_id":"b609eb3eb9bb11eaadb00242ac120008"},{"event_id":"b6afdb82b9bd11eaaf510242ac120008"},{"event_id":"b7a9c33cb9bc11eaac100242ac120008"},{"event_id":"b89cf0bab9bd11eab41e0242ac120008"},{"event_id":"b8dcb7c2b9bd11eab41e0242ac120008"},{"event_id":"b901c9a0b9bc11ea9f830242ac120008"},{"event_id":"b9fae4fab9bb11ea8fa40242ac120008"},{"event_id":"ba311290b9bc11ea9f830242ac120008"},{"event_id":"ba99660ab9bd11eaad310242ac120008"},{"event_id":"bbaf2bd8b9bd11eab5460242ac120008"},{"event_id":"bc85dfaeb9bb11ea9e360242ac120008"},{"event_id":"bcef141eb9bc11ea87c50242ac120008"},{"event_id":"bd4c9e44b9bd11eaaa220242ac120008"},{"event_id":"bdf8de1cb9bc11ea87c50242ac120008"},{"event_id":"bf266574b9bd11eaa1980242ac120008"},{"event_id":"c0ec2930b9bc11eab8740242ac120008"},{"event_id":"c1bc3ba2b9bc11eab8740242ac120008"},{"event_id":"c2490ee8b9bb11ea964c0242ac120008"},{"event_id":"c267228cb9bd11ea81d70242ac120008"},{"event_id":"c36d9670b9bd11ea81d70242ac120008"},{"event_id":"c41dd374b9bc11eab6470242ac120008"},{"event_id":"c47e5612b9bd11eaba750242ac120008"},{"event_id":"c5828df8b9bd11eaa4210242ac120008"},{"event_id":"c6626cfcb9bd11eaa5970242ac120008"},{"event_id":"c7b3e63ab9bd11ea8b100242ac120008"},{"event_id":"c85c8c00b9bc11eaaa8e0242ac120008"},{"event_id":"c984a752b9bc11eaaa8e0242ac120008"},{"event_id":"ca06e8a6b9bd11ea95160242ac120008"},{"event_id":"cb6e4974b9bc11ea86970242ac120008"},{"event_id":"ccb2994cb9bd11eabf4c0242ac120008"},{"event_id":"cd1775f2b9bc11ea86970242ac120008"},{"event_id":"cda5bfdcb9bd11eab1660242ac120008"},{"event_id":"cebea5e2b9bc11ea84540242ac120008"},{"event_id":"cf1dd8e2b9bb11ea87770242ac120008"},{"event_id":"cf24faeab9bc11ea84540242ac120008"},{"event_id":"cf9b6d2ab9bb11ea87770242ac120008"},{"event_id":"cfa72b00b9bc11ea84540242ac120008"},{"event_id":"d012edc6b9bd11eaa7560242ac120008"},{"event_id":"d0a8aa74b9bc11eaa58f0242ac120008"},{"event_id":"d1dd7c9eb9bc11ea96330242ac120008"},{"event_id":"d27195a4b9bd11ea99720242ac120008"},{"event_id":"d52da3c8b9bd11eaad020242ac120008"},{"event_id":"d59ca33cb9bc11ea8eae0242ac120008"},{"event_id":"d5fd62f8b9bc11ea8eae0242ac120008"},{"event_id":"d6df0690b9bc11ea8eae0242ac120008"},{"event_id":"d6df9cf8b9bd11eaab270242ac120008"},{"event_id":"d746eb24b9bd11eaab270242ac120008"},{"event_id":"d77d23acb9bc11ea8eae0242ac120008"},{"event_id":"d94c8be0b9bd11ea88710242ac120008"},{"event_id":"d966a18eb9bc11ea860b0242ac120008"},{"event_id":"da1dcf34b9bd11ea82f10242ac120008"},{"event_id":"db302534b9bd11eaaff10242ac120008"},{"event_id":"dca123cab9bb11ea98570242ac120008"},
            {"event_id":"dce10822b9bc11ea89a20242ac120008"},{"event_id":"dd1c2250b9bb11ea98570242ac120008"},{"event_id":"dd357812b9bc11ea89a20242ac120008"},{"event_id":"de046cf4b9bb11ea98570242ac120008"},{"event_id":"de512698b9bb11ea98570242ac120008"},{"event_id":"dea8a2ceb9bb11ea98570242ac120008"},{"event_id":"def151d6b9bb11ea98570242ac120008"},{"event_id":"def6c0f6b9bd11ea83480242ac120008"},{"event_id":"df5fd94eb9bb11ea98570242ac120008"},{"event_id":"dfcb467ab9bb11ea98570242ac120008"},{"event_id":"e02396a8b9bc11ea9d080242ac120008"},{"event_id":"e18933bcb9bd11ea9bc80242ac120008"},{"event_id":"e226c85eb9bb11eaa32f0242ac120008"},{"event_id":"e244a8c8b9bc11eaacfc0242ac120008"},{"event_id":"e2b2df72b9bd11eaa8c30242ac120008"},{"event_id":"e4930f7eb9bd11eaa8c30242ac120008"},{"event_id":"e55a64a8b9bc11eab4f30242ac120008"},{"event_id":"e8ea5c58b9bd11ea93f10242ac120008"},{"event_id":"ea13ab58b9bc11eabd3f0242ac120008"},{"event_id":"ebe6f0deb9bc11ea99720242ac120008"},{"event_id":"ecacb73cb9bd11eaa29f0242ac120008"},{"event_id":"eef12f00b9bd11ea967d0242ac120008"},{"event_id":"f0236762b9bd11ea967d0242ac120008"},{"event_id":"f1301858b9bd11eabf9b0242ac120008"},{"event_id":"f43f590ab9bd11ea892c0242ac120008"},{"event_id":"f7bfced4b9bd11eab55b0242ac120008"},{"event_id":"f8b82606b9bd11eab55b0242ac120008"},{"event_id":"f9b8b192b9bd11ea9f720242ac120008"},{"event_id":"fce73172b9bd11ea864b0242ac120008"},{"event_id":"fd90c99eb9bd11ea864b0242ac120008"},{"event_id":"fff12936b9bd11ea81970242ac120008"}],"source":"cnn"},{"article_id":"f9b67d9f41a89553989ab1e1b89becad","summary":["唐纳德·特朗普总统一直把朝鲜领导人金正恩当作一个重要的外交政策代言人","唐纳德·特朗普总统与金正恩的关系以及朝鲜做出的小让步"],"spider_time":"2020-06-21 12:17:01","translated_title":"在特朗普发动政治战争的同时，亚洲也出现了危险的冲突","event_ids":[{"event_id":"64c54896b9ba11eab12d0242ac120008"},{"event_id":"659a1666b9ba11eab12d0242ac120008"},{"event_id":"65f521fab9ba11eab12d0242ac120008"},{"event_id":"67d42bd8b9ba11ea88d10242ac120008"},{"event_id":"6879a8a6b9ba11ea88d10242ac120008"},{"event_id":"6a0eb65cb9ba11eaa5190242ac120008"},{"event_id":"6b878ec8b9ba11eab3e70242ac120008"},{"event_id":"6cd6f732b9ba11ea87660242ac120008"},{"event_id":"6e3fd38cb9ba11ea936e0242ac120008"},{"event_id":"706de52cb9ba11eaad450242ac120008"},{"event_id":"72ade9d6b9ba11eabd4e0242ac120008"},{"event_id":"73c675a4b9ba11eabd4e0242ac120008"},{"event_id":"747ee06cb9ba11eabd4e0242ac120008"},{"event_id":"7652809cb9ba11eab48f0242ac120008"},{"event_id":"7825c82ab9ba11eaa28f0242ac120008"},{"event_id":"79a8e3d0b9ba11ea9b810242ac120008"},{"event_id":"7b3f04b8b9ba11eaaee10242ac120008"},{"event_id":"7ef3d3aeb9ba11eaba150242ac120008"},{"event_id":"807484d0b9ba11eaba150242ac120008"},{"event_id":"80f3dbeab9ba11eaba150242ac120008"},{"event_id":"81f91b90b9ba11ea8eb60242ac120008"},{"event_id":"8368285eb9ba11ea84d30242ac120008"},{"event_id":"83ff2ac4b9ba11ea84d30242ac120008"},{"event_id":"84d996aab9ba11eab5450242ac120008"},{"event_id":"864ce79eb9ba11eaa6870242ac120008"},{"event_id":"87bacbc8b9ba11ea90ac0242ac120008"},{"event_id":"882b0e92b9ba11ea90ac0242ac120008"},{"event_id":"88e5aa0eb9ba11ea90ac0242ac120008"},{"event_id":"89c46794b9ba11ea9e990242ac120008"},{"event_id":"8b323e1cb9ba11eaa6910242ac120008"},{"event_id":"8ca38a12b9ba11eaa6910242ac120008"},{"event_id":"8e1de4dcb9ba11eaaf820242ac120008"},{"event_id":"9070f2f6b9ba11ea82570242ac120008"},{"event_id":"91f66836b9ba11eaa3ea0242ac120008"},{"event_id":"936b6ea0b9ba11eabf900242ac120008"},{"event_id":"93dfa054b9ba11eabf900242ac120008"},{"event_id":"957a5de6b9ba11eab0e80242ac120008"},{"event_id":"962dda56b9ba11ea898b0242ac120008"},{"event_id":"97ea8556b9ba11eab27b0242ac120008"},{"event_id":"995c0d4cb9ba11ea91990242ac120008"},{"event_id":"9ba62362b9ba11ea883d0242ac120008"},{"event_id":"9e48a536b9ba11eabe910242ac120008"},{"event_id":"9f92697cb9ba11ea83260242ac120008"},{"event_id":"a0feb2d4b9ba11ea9e560242ac120008"},{"event_id":"a25f5e62b9ba11ea91a50242ac120008"},{"event_id":"a400526cb9ba11ea92c90242ac120008"},{"event_id":"a5742bc8b9ba11eabeaf0242ac120008"},{"event_id":"a6c04f66b9ba11eaa0f00242ac120008"}],"source":"cnn"}],
            event_id: "",
            event_sentence: "",
            article_id: "",
            title: "",
            sentence: "",
            dialogVisible: false,
            showOrhidden: false,
            article_title: "在特朗普发动政治战争的同时，亚洲也出现了危险的冲突",
            article_content: "当美国在2020年的大部分时间里被国内危机所摧毁的时候，世界其他地区并没有停止转向。相反，许多全球性威胁----比如纳戈尔诺-卡拉巴赫----的广度和深度都在增长，而政府却忙于应对姗姗来迟的Covid-19大流行，处理国内分歧以及对警察暴行和系统性种族主义的强烈抗议。与此同时，当唐纳德·特朗普总统一直在对唐纳德·特朗普总统心目中的政治敌人发动战争时，中国和印度这两个核武装大国之间的紧张局势已经升级，并带来致命后果。在川普总统似乎主要集中攻击川普总统前国家安全顾问约翰·博尔顿，以及说川普总统认为会赢得竞选支持的任何话的时候，亚洲的这两场冲突给美国国家安全带来了严重挑战。这种做法预示着，当这种做法涉及到处理亚洲安全问题时，将继续缺乏任何连贯，知情的战略。多年来，唐纳德·特朗普总统一直把朝鲜领导人金正恩当作一个重要的外交政策代言人。唐纳德·特朗普总统不准确地指出，唐纳德·特朗普总统与金正恩的关系以及朝鲜做出的小让步，如释放俘虏遗体，是他在朝鲜半岛无核化方面取得进展的标志。现在，特朗普的首选外交政策代理人可能是特朗普首选外交政策代理人的最大责任。尽管金正日与唐纳德·特朗普总统会晤并成为金正日喜欢的笔友，但他仍在继续快速发展其非法核计划和其他常规能力，朝鲜最近加大了对美国和我们盟友直接威胁的赌注。事实是，特朗普总统并不是唯一一个脸皮薄的领导人--他和金正恩都有这样的特质。最近，韩国叛逃者将反平壤的传单越过边界送进了朝鲜，朝鲜和韩国之间的紧张局势加剧。这不是第一次发生这种情况，但这一次，金氏政权以武力回应。他们实际上炸毁了本应致力于改善朝韩关系的朝韩联络处。他们还威胁要把军队派到以前非军事化的边境地区，以及更多地区。包括金正恩的妹妹金与正在内的反平壤人士对韩国总统文在寅进行了口头侮辱，他指责文在寅是“亲美的奴才主义”。“这与文在寅与金正恩的前几次峰会上所表现出的朝韩之间的热情相去甚远。朝鲜半岛局势的升级现在已经成为现实，美国在那里驻扎了数千名军人及其家属。而且，如果特朗普的过去是序幕，那么如果金正恩继续在朝鲜半岛上的危险行为，他是否会站在我们的盟友韩国一边是不确定的。然而，金正日的怒火并不只是留给韩国。在美国国务院对反平壤加剧与韩国的紧张关系表示失望后，朝鲜外交部向美国发出了警告。“闭上你的嘴就好了。外交部说，这不仅符合美国的利益，也有利于在你们面前举行成功的总统选举。此前，朝鲜拥有先进的网络能力，过去曾利用这些能力对付美国资产。很显然，无核化在很久以前不过是一个白日梦--而且金正日最近公开发誓要增强朝鲜的核威慑力。“金正日没有去核化，而且可能会在去军事化问题上走回头路。”朝鲜半岛发生直接物理对抗的风险更像是一个现实，朝鲜半岛对美国民主的直接攻击也是如此。尽管朝鲜的破坏稳定行动在过去几个月里只增加了--他们清楚地意识到，在金正恩即将参加大选之际，特朗普不顾一切地想要抓住金正恩，他们可能正试图向金正恩施压，迫使金正恩做出让步，以保持与朝鲜“成功”的某种表象。他们知道特朗普将特朗普的政治议程置于政策重点之上，他们可能试图激怒特朗普给他们想要的东西----减轻制裁----以换取在特朗普竞选期间冷却制裁。当特朗普政府想出如何应对金正日制造的混乱时--更不用说与中国的双边紧张关系了--印度和中国之间也发生了直接的肢体冲突。周一，至少20名印度士兵在加尔万河谷被打死。加尔万河谷是中国控制的地区，但两国都声称拥有主权。1962年，印度和中国为争夺这块狭长的土地而开战，此后，两国就一直维持着脆弱的现状。这并不是紧张局势第一次升级，但本周早些时候的伤亡事件标志着中印关系几十年来最血腥的一幕，因为两国都指责对方不尊重实际控制线(LAC)，而实际控制线是事实上的边界。据报道，尽管试图缓和紧张局势，印度和中国仍在军事上加强了印度和中国在该地区的阵地。虽然这片狭长的土地面积小，相对不适宜居住，但这片狭长的土地对两国都具有战略重要性。印度总理纳伦德拉·莫迪已经证明了印度总理纳伦德拉·莫迪愿意勇敢地面对中国的地区野心。他明确表示，印度总理纳伦德拉·莫迪不会让印度被中国欺负。此外，两位领导人都有政治因素在起作用--在一个民族主义议程上退让可能会给两位领导人在国内带来代价。尽管印度和中国官员星期四举行会晤，讨论局势升级的问题，但印度国内仍有要求对中国进行报复的呼声。而且，当印度和中国的官员在口头上进行斗争时，我们必须做出一些让步，因为正如我们所看到的那样，使用武力是完全摆在桌面上的。现在迫切需要一个下坡路，因为两国可能都在寻找出路。两国不仅仍在与Covid-19作斗争，面临经济不确定性，而且两国都需要一个下坡路，让两国在国内挽回面子。要做到这一点，就需要在外交上仔细调整，对任何生命损失作出让步，并协调一致地降低该地区军事资产的升级程度。当然，问题就变成了谁来帮助开发这个出口。特朗普与莫迪关系融洽--去年夏天莫迪曾接待过莫迪访美，但莫迪与中国领导人习近平的关系已经从奉承（据称还请莫迪帮助连任）变成了把中国当作莫迪应对Covid-19疫情不力的替罪羊。另外，特朗普不能让特朗普不能拥有交易，更不用说调解别人了。特朗普的任何介入都可能使事情变得更糟，而不是更好。美国国务卿迈克蓬佩奥周三在夏威夷与中国国务卿迈克蓬佩奥进行了会晤，但根据蓬佩奥团队的说法，中方在会谈中并不“积极”，并表示中国在有争议的边境地区的行动可能只是“在鼻子上打了一拳，以显示他们的优势”。“当国务院试图在多条战线上应对中国的侵略时，中国人也不得不面对这样一个事实:特朗普会说或做任何特朗普认为最具政治权宜之计的事情。特朗普周四在推特上甚至在对华贸易问题上削弱了国务卿迈克蓬佩奥的实力，他在其他与中国有关的问题上，如香港，维吾尔人等问题上也表现得淋漓尽致。亚洲的这两场危机意味着，在特朗普任期的最后几个月里，特朗普在外交政策上的履历非常清晰。特朗普让美国面临更多而不是更少的来自朝鲜的风险，同时也让美国成为试图解决全球冲突时最薄弱的一环。这一切都要感谢特朗普，难怪金正恩和习近平这样的领导人认为金正恩和习近平这样的领导人可以不受惩罚地行事。。",
            target_name: "",
            infoALL: "infoALL",
            spanNumber: 22,
            offsetNum: 2,
            spanNubers: 0,
            tableData: [{"event_id":"ca94b728b60a11ea91870242ac120008","event_date":"","event_sentence":"特朗普介入一起针对土耳其一家银行的伊朗制裁案"},{"event_id":"ccca4fbcb60a11ea91870242ac120008","event_date":"","event_sentence":"特朗普潜入"},{"event_id":"9c7dc23cb60d11ea8c870242ac120008","event_date":"","event_sentence":"沙特,特朗普投放重磅炸弹"},{"event_id":"a0feb2d4b9ba11ea9e560242ac120008","event_date":"","event_sentence":"特朗普介入"},{"event_id":"a3fb7476b9bb11eabcaa0242ac120008","event_date":"","event_sentence":"特朗普取消"},{"event_id":"138d33eab9be11eaae790242ac120008","event_date":"","event_sentence":"特朗普,特朗普,特朗普政府遭遇LGBTQ权利和移民问题"},{"event_id":"8af6cb34b9d311eabc9a0242ac120008","event_date":"","event_sentence":"特朗普入侵"},{"event_id":"667a5792bb8311eab0a30242ac120008","event_date":"","event_sentence":"特朗普总统鼓励对民主党强力候选人，前副总统拜登的腐败案"},{"event_id":"6e42f83abb8311ea837d0242ac120008","event_date":"","event_sentence":"美国总统唐纳德·特朗普调查美国总统唐纳德·特朗普的政绩"}],
            eventIdList: ["ca94b728b60a11ea91870242ac120008","ccca4fbcb60a11ea91870242ac120008","9c7dc23cb60d11ea8c870242ac120008","a0feb2d4b9ba11ea9e560242ac120008","a3fb7476b9bb11eabcaa0242ac120008","138d33eab9be11eaae790242ac120008","bc00205eb9bf11ea8d250242ac120008","bf5debfab9bf11eaae780242ac120008","8af6cb34b9d311eabc9a0242ac120008"],
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
            // functionAll
            //     .getArticleInfo({
            //         article_id: item.article_id,
            //         event_id: this.eventIdList
            //     })
            //     .then(res => {
            //         this.article_content = res.data.result_article.content;
            //         res.data.result_sentence.forEach(list => {
            //             // 匹配关键字正则
            //             const replaceReg = new RegExp(list.event_sentence, "g");
            //             // 高亮替换v-html值
            //             const replaceString =
            //                 '<span class="search-text">' + list.event_sentence + "</span>";
            //             this.article_content = this.article_content.replace(
            //                 replaceReg,
            //                 replaceString
            //             );
            //         });
            //         this.article_title = item.translated_title;
            //     })
            //     .catch(err => {
            //         return false;
            //     });
            // 匹配关键字正则
                const replaceReg = new RegExp("特朗普的任何介入都可能使事情变得更糟，而不是更好。", "g");
                // 高亮替换v-html值
                const replaceString =
                    '<span class="search-text">' + "特朗普的任何介入都可能使事情变得更糟，而不是更好。" + "</span>";
                this.article_content = this.article_content.replace(
                    replaceReg,
                    replaceString
                );
        },
        select() {
            // this.ListAll.forEach(item => {
            //                     item["click"] = "0";
            //                 });
            //调用相似度匹配，查询列表
            // functionAll
            //     .handleGet({
            //         search: this.search
            //     })
            //     .then(res => {
            //         this.tableData = [...res.data.events];
            //         //将返回的所有事件id存为一个数组
            //         res.data.events.forEach(item => {
            //             this.eventIdList.push(item.event_id);
            //         });
            //         //查询文章列表
            //         functionAll
            //             .getArticleList({
            //                 event_id: this.eventIdList
            //             })
            //             .then(res => {
            //                 this.ListAll = res.data.result;
                            
                //         })
                //         .catch(err => {
                //             return false;
                //         });
                // })
                // //   // }
                // // })
                // .catch(err => {});
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
