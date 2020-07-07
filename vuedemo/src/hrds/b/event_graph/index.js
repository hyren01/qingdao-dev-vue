import request from '@/utils/request'

export function handleGet(data) {
    return request({
        url: '/A/eventgraph/getEventSearch',
        params: data
    })
}

export function getEventRel(data) {
    return request({
        url: '/A/eventgraph/getEventRel',
        params: data
    })
}

export function getArticleList(data) {
    return request({
        url: '/A/eventgraph/getEventRelAndArticle',
        params: data
    })
}

export function getArticleInfo(data) {
    return request({
        url: '/A/eventgraph/getArticleInfo',
        params: data
    })
}

export function getEventToEvent(data) {
    return request({
        url: '/A/eventgraph/getEvent2Event',
        params: data
    })
}