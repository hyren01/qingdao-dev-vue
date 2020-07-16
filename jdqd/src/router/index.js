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
                { 
                    path: '/event_suanfa', name: 'suanfa', component: () => import('@/hrds/b/event_extract/suanfa.vue'), 
                    meta: [{ name: '首页' }, { name: '事件提取', url: '/event_extract' }, { name: '详情'}]
                },
                { 
                    path: '/event_singlesuanfa', name: 'singlesuanfa', component: () => import('@/hrds/b/event_extract/singlesuanfa.vue'),
                    meta: [{ name: '首页' }, { name: '事件提取', url: '/event_extract' }, { name: '详情'}]
                },
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
                { 
                    path: '/create_model', name: 'createModel', component: () => import('@/hrds/b/event_predict/model_train/create.vue') ,
                    meta: [{ name: '首页' }, { name: '模型训练', url: '/create_model' },{ name: '创建模型' }]
                },
                {
                    path: '/nestdetail', name: 'nestdetail', component: () => import('@/hrds/b/event_predict/model_train/detail.vue') ,
                    meta: [{ name: '首页' }, { name: '模型训练', url: '/nestdetail' },{ name: '模型训练详情' }]
                },
                //----------------------------模型训练end--------------------------------
                {
                    path: '/data_manage', name: 'dataManage', component: () => import('@/hrds/b/data_manage/index.vue'),
                    meta: [{ name: '首页' }, { name: '数据管理', url: '/data_manage' }]
                },
                //----------------------------数据管理start------------------------------

                //----------------------------数据管理end--------------------------------

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

            ]
        },
        //其他访问连接直接跳转到无效页面
        { path: '*', name: '*', component: () => import('@/hrds/components/notFound.vue') },
    ]
})
