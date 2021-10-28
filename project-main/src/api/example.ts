import { axiosHttp as request } from './axios-config';

const apiPre = '';

export function getExamples(params: any) {
  return request({
    url: `${apiPre}/example/getExamples`,
    method: 'get',
    params
  })
}

export function getExampleById(params: any) {
  return request({
    url: `${apiPre}/example/getExample`,
    method: 'get',
    params
  })
}