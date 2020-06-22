import request from '@/utils/request'


export function getArticleList(data) {
    return request({
        url: '/A/event/getArticleList',
        params: data
    })
}

export function readFileDecode() {
    return request({
        url: '/A/eventcurd/readFileDecode',
    })
}

export function getArticleDetail(data) {
    return request({
        url: '/A/event/getArticleDetail',
        params: data
    })
}

export function getArticleHighLight(data) {
    return request({
        url: '/A/event/getArticleHighLight',
        params: data
    })
}

export function getSimilarArticleTitle(data) {
    return request({
        url: '/A/event/getSimilarArticleTitle',
        params: data
    })
}

export function getEventArticle(data) {
    return request({
        url: '/A/event/getEventArticle',
        params: data
    })
}

export function getEventArticleByDate(data) {
    return request({
        url: '/A/event/getEventArticleByDate',
        params: data
    })
}

export function getEventRelateArticleMess(data) {
    return request({
        url: '/A/event/getEventRelateArticleMess',
        params: data
    })
}

export function getBakInfoList(data) {
    return request({
        url: '/A/event/getBakInfoList',
        params: data
    })
}

export function generateInsertSqlDemo(data) {
    return request({
        url: '/A/eventcurd/generateInsertSqlDemo',
        params: data
    })
}