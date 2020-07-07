import request from '@/utils/request'

export function handleGet(data) {
    return request({
        url: '/A/eventpredict/getEventPredictInfoById',
        params: data
    })
}

export function handleEdit(data) {
    return request({
        url: '/A/eventpredict/getEventPredictResultByTask',
        params: data
    })
}

export function rePredict(data) {
    return request({
        url: '/A/eventpredict/rePredict',
        params: data
    })
}

export function handleDelete(data) {
    return request({
        url: '/A/eventpredict/deletePredictById',
        params: data
    })
}

export function indexGetData(data) {
    return request({
        url: '/A/eventpredict/getEventPredictInfo',
        params: data
    })
}


export function forecastBtnJs(data) {
    return request({
        url: '/A/eventpredict/addEventPredictInfo',
        params: data
    })
}

export function newgetData(data) {
    return request({
        url: '/A/modeltrain/getModelTrainInfo',
        params: data
    })
}

export function detailGetData(data) {
    return request({
        url: '/A/eventpredict/getEventPredictResultByTask',
        params: data
    })
}


export function modelDetailGetData(data) {
    return request({
        url: '/A/eventpredict/getEventPredictByForecastDate',
        params: data
    })
}

export function modelDetailGetData2(data) {
    return request({
        url: '/A/eventpredict/getEventPredictByEvent',
        params: data
    })
}


export function historyDetailGetHistoryInfo(data) {
    return request({
        url: '/A/eventpredict/getEventPredictModelDetail',
        params: data
    })
}

export function cuereGetData(data) {
    return request({
        url: '/A/eventrecognition/getEventRecongnition',
        params: data
    })
}