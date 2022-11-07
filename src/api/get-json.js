import * as request from '../utils/request'

// 获取全国JSON
export const getChinaJson = (params) => request.get(`http://localhost:8444/map/china.json`, params)

// 获取省JSON
export const getProvinceJSON = (path, params) => request.get(`http://localhost:8444//map/province/${path}.json`, params)

// 获取市JSON
export const getCityJSON = (path, params) => request.get(`http://localhost:8444/map/city/${path}.json`, params)
