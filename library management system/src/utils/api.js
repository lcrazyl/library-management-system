import request from './request'


export const getAllBooks = () => {
    return request({
        url: '/allBooks',
        method: 'get'
    })
}

export const getAllBorrower = () => {
    return request({
        url: '/allBorrower',
        method: 'get'
    })
}
export const getBookAnalysis = () => {
    return request({
        url: '/bookAnalysis',
        method: 'get'
    })
}
export const getUserManage = () => {
    return request({
        url: '/userManagement',
        method: 'get'
    })
}
export const getOrder = () => {
    return request({
        url: '/order',
        method: 'get'
    })
}
export const getRecord = () => {
    return request({
        url: '/record',
        method: 'get'
    })
}