import { axiosHttp as request } from './axios-config';

const apiPre = '';

export function getPlanList(options: any) {
  return request({
    url: `${apiPre}/plan/getDatas`,
    method: 'get',
    params: options?.params,
    body: options?.body
  })
}

export function getPlanById(options: any) {
  return request({
    url: `${apiPre}/plan/getDataById`,
    method: 'get',
    params: options?.params,
    body: options?.body
  })
}