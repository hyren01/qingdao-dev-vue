import request from '@/utils/request'

export function downloadFile(id) {
    return request({
        url: '/A/datamanage/downloadFile',
        params: {
            'id' : id
        },
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function getTDataManage() {
    return request({
        url: '/A/datamanage/getTDataManage'
    })
}

export function exportData() {
    return request({
        url: '/A/datamanage/exportData',
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function inputData(data) {
    return request({
        url: '/A/datamanage/inputData',
        data: data,
        headers: { 'Content-Type': 'multipart/form-data' }
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