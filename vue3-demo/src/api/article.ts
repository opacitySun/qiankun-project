import { axiosHttp as request } from './axios-config';

const apiPre = '';

export function getArticleList(params: any) {
  return request({
    url: `${apiPre}/article/getDatas`,
    method: 'get',
    params
  })
}

export function getArticleById(params: any) {
  return request({
    url: `${apiPre}/article/getDataById`,
    method: 'get',
    params
  })
}