import request from '@/utils/request'


export function getModelTrainInfo(data) {
    return request({
        url: '/A/modeltrain/getModelTrainInfo',
        params: data
    })
}

export function deleteModelInfoById(data) {
    return request({
        url: '/A/modeltrain/deleteModelInfoById',
        params: data
    })
}


export function addModelInfo(data) {
    return request({
        url: '/A/modeltrain/addModelInfo',
        params: data
    })
}


export function getModelTrainInfoById(data) {
    return request({
        url: '/A/modeltrain/getModelTrainInfoById',
        params: data
    })
}

export function getModelDteailByEvent(data) {
    return request({
        url: '/A/modeltrain/getModelDteailByEvent',
        params: data
    })
}

export function modelReturn(data) {
    return request({
        url: '/A/modeltrain/modelReturn',
        params: data
    })
}