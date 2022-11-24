/**
 * @createdAt: 2022/08/07
 * @author: @FaisalAffan <faisallionel@gmail.com>
 */

import axios from 'axios'
import { ResponseStruct, ResponseTimeout } from '../domain/local/ResponseStruct'

const TIMEOUT = parseInt(process.env.TIMEOUT_API || '4000')
const API_HOST = process.env.API_URL || 'http://localhost:3000/api/v1'
// const API_HOST = ''
// const token = VueCookie.get('token')
const token = ''

const get = (url: string) => {
    return axios({
        url,
        method: 'GET',
        baseURL: API_HOST,
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
        },
        transformResponse: (data) => {
            data = JSON.parse(data)
            const response = new ResponseStruct({
                code: data.code,
                success: data.success,
                message: data.message,
                data: data.data,
                error: data.error,
                pagination: data.pagination,
            })
            return response
        },
        timeout: TIMEOUT,
    })
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            if (err.code === 'ECONNABORTED') {
                return ResponseTimeout()
            }
            return err.response.data
        })
}

const post = (url: string, payload: any) => {
    return axios({
        url,
        method: 'POST',
        baseURL: API_HOST,
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
        },
        data: payload,
        transformResponse: (data) => {
            data = JSON.parse(data)
            const response = new ResponseStruct({
                code: data.code,
                success: data.success,
                message: data.message,
                data: data.data,
                error: data.error,
                pagination: data.pagination,
            })
            return response
        },
        timeout: TIMEOUT,
    })
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            if (err.code === 'ECONNABORTED') {
                return ResponseTimeout()
            }
            return err.response.data
        })
}

const Http = { get, post }

export default Http
