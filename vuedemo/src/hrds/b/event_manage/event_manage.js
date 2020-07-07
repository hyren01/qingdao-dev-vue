import request from '@/utils/request'


export function queryTableTeventalls() {
    return request({
        url: '/A/eventcurd/queryTableTeventalls',
    })
}


export function queryTableTeventall(data) {
    return request({
        url: '/A/eventcurd/queryTableTeventall',
        params: data
    })
}


export function addToTableTeventall(data) {
    return request({
        url: '/A/eventcurd/addToTableTeventall',
        params: data
    })
}

export function deleteTableTeventall(data) {
    return request({
        url: '/A/eventcurd/deleteTableTeventall',
        params: data
    })
}