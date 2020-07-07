import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
// 解决两次访问相同路由地址报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

/**
 *
 * 路由配置信息
 *  routes : [{这里的第一层表示为普通的路由地址,children : [{这个里面的是二级路由配置}]
 * 路由配置如 :
 *  {
 *      @param path: "/home"   表示的是路由匹配路径,
 *      @param name: 'home' 路由的名称
 *      @param component: () => import('@/hrds/login/index') 后面为路由地址的具体页面
 *  }
 *
 */
export default new Router({
    routes: [
        { path: '/', name: 'login', component: () => import('@/hrds/login/login.vue') },
        {
            //菜单路由地址配置
            path: "/home", name: 'home', component: () => import('@/hrds/components/menu'), children: [
                { path: '/systemParameters', name: 'systemParameters', component: () => import('@/hrds/a/syspara/syspara.vue') },
                {
                    path: '/dashboard', name: 'dashboard', component: () => import('@/hrds/b/dashboard/index.vue'),
                    meta: [{ name: '首页', url: '/dashboard' }]
                },
                //----------------------------事件抽取start--------------------------------
                {
                    path: '/event_extract', name: 'eventExtract', component: () => import('@/hrds/b/event_extract/index.vue'),
                    meta: [{ name: '首页' }, { name: '事件提取', url: '/event_extract' }]
                },
                { path: '/event_suanfa', name: 'suanfa', component: () => import('@/hrds/b/event_extract/suanfa.vue') },
                { path: '/event_singlesuanfa', name: 'singlesuanfa', component: () => import('@/hrds/b/event_extract/singlesuanfa.vue') },
                //----------------------------事件抽取end--------------------------------

                // {
                //     path: '/event_manage', name: 'eventManage', component: () => import('@/hrds/b/event_manage/index.vue'),
                //     children: [
                //         { path: '/detailevent', name: 'detailEvent', component: () => import('@/hrds/b/event_manage/edit.vue') },
                //     ]
                // },
                {
                    path: '/event_graph', name: 'eventGraph', component: () => import('@/hrds/b/event_graph/index.vue'),
                    meta: [{ name: '首页' }, { name: '事件图谱', url: '/event_graph' }]
                },
                { path: '/people_coview', name: 'peopleCoview', component: () => import('@/hrds/a/syspara/syspara.vue') },
                //----------------------------模型管理start--------------------------------
                {
                    path: '/event_manage', name: 'eventManage', component: () => import('@/hrds/b/event_manage/index.vue'),
                    meta: [{ name: '首页' }, { name: '事件管理', url: '/event_manage' }]
                },
                //----------------------------模型管理end--------------------------------

                //----------------------------模型训练start--------------------------------
                {
                    path: '/train_model', name: 'trainModel', component: () => import('@/hrds/b/event_predict/model_train/index.vue'),
                    meta: [{ name: '首页' }, { name: '模型训练', url: '/train_model' }]
                },
                { path: '/create_model', name: 'createModel', component: () => import('@/hrds/b/event_predict/model_train/create.vue') },
                { path: '/nestdetail', name: 'nestdetail', component: () => import('@/hrds/b/event_predict/model_train/detail.vue') },
                //----------------------------模型训练end--------------------------------

                //----------------------------Demo start--------------------------------
                {
                    path: '/model_train', name: 'train', component: () => import('@/hrds/b/model_train/index.vue'),
                    meta: [{ name: '首页' }, { name: '模型训练', url: '/model_train' }]
                },
                {
                    path: '/create_train', name: 'createTrain', component: () => import('@/hrds/b/model_train/create.vue'),
                    meta: [{ name: '首页' }, { name: '创建模型', url: '/create_train' }]
                },
                {
                    path: '/model_detail2', name: 'modelDetail2', component: () => import('@/hrds/b/model_train/model_detail.vue'),
                    meta: [{ name: '首页' }, { name: '模型详情', url: '/model_detail2' }]
                },
                {
                    path: '/retrain_model', name: 'retrainModel', component: () => import('@/hrds/b/model_train/retrain_model.vue'),
                    meta: [{ name: '首页' }, { name: '迭代训练', url: '/retrain_model' }]
                },
                //----------------------------Demo end--------------------------------


                //----------------------------事件预测--------------------------------
                {
                    path: "/event_predict",
                    name: "eventPredict",
                    component: () => import("@/hrds/b/event_predict/event_prediction/index.vue"),
                    meta: [{ name: '首页' }, { name: '事件预测', url: '/event_predict' }]
                },
                {
                    path: "/newEvent",
                    name: "NewEvent",
                    component: () => import("@/hrds/b/event_predict/event_prediction/newEvent")
                },
                {
                    path: "/deTail",
                    name: "deTail",
                    component: () => import("@/hrds/b/event_predict/event_prediction/detail")
                },
                {
                    path: "/modelDetail",
                    name: "modelDetail",
                    component: () => import("@/hrds/b/event_predict/event_prediction/modelDetail")
                },
                {
                    path: "/historyDetail",
                    name: "historyDetail",
                    component: () => import("@/hrds/b/event_predict/event_prediction/historyDetail")
                },
                {
                    path: "/cuereCognition",
                    name: "cuereCognition",
                    component: () => import("@/hrds/b/event_predict/event_prediction/cuereCognition")
                },
                { path: '/echarts', name: 'Echarts', component: () => import('@/hrds/b/event_graph/echarts.vue') },
                {
                    path: '/wordCallout',
                    name: 'wordCallout',
                    component: () => import('@/hrds/b/wordcallout/index.vue'),
                    meta: [{ name: '首页' }, { name: '语料标注', url: '/wordCallout' }]
                },
                {
                    path: '/cotpus',
                    name: 'cotpus',
                    component: () => import('@/hrds/b/wordcallout/cotpus.vue'),
                    meta: [{ name: '首页' }, { name: '语料标注', url: '/wordCallout' }, { name: '语料主题', url: '/cotpus' }]
                },
                {
                    path: '/corpusdetails',
                    name: 'corpusdetails',
                    component: () => import('@/hrds/b/wordcallout/corpusdetails.vue'),
                    meta: [{ name: '首页' }, { name: '语料标注', url: '/wordCallout' }, { name: '语料主题' }, { name: '语料详情', url: '/corpusdetails' }]
                },
                {
                    path: '/addCorpus',
                    name: 'addCorpus',
                    component: () => import('@/hrds/b/wordcallout/addCorpus.vue'),
                    meta: [{ name: '首页' }, { name: '语料标注', url: '/wordCallout' }, { name: '语料主题' }, { name: '标注', url: '/addCorpus' }]
                }
            ]
        },
        //其他访问连接直接跳转到无效页面
        { path: '*', name: '*', component: () => import('@/hrds/components/notFound.vue') },
    ]
})
