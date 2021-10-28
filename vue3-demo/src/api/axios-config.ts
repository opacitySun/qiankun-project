import axios from 'axios';
import { UtilsService } from '@src/utils/utils';
import { server, devServer } from '@src/utils/helper';

const utils = new UtilsService();
const apiPrefix: string = process.env.NODE_ENV === "production" ? '' : '/api';
const path: string = process.env.NODE_ENV === "production" ? server.baseURL : `http://${window.location.host}`;
const timeout: number = 1000 * 30;
const baseURL: string = path + apiPrefix;
const defaultContentType: string = 'application/json;charset=utf-8';
const responseType: string = 'json';
const axiosLoading: boolean = false;
const auth: string = 'sale-ide:t359yd8w9ui2e6624w85v';

type AxiosHttpOptions = {
  url: string;
  params?: object | null | void;
  body?: object | null | void;
  method: string;
  configType?: string;
}

const axiosFn = (options: any) => {
  const axiosSetting: any = {
    method: options.method,
    url: options.url,
    params: options.params,
    body: options.body,
    responseType: responseType,
    baseURL: baseURL,
    timeout: timeout,
    headers: {
      'Content-Type': options.contentType || defaultContentType,
      'Authorization': utils.stringToBase64(auth)
    }
  };
  return axios(axiosSetting);
}

export const axiosHttp = ({url, params = {}, body = {}, method = "POST", configType = ""} : AxiosHttpOptions) => {
  let contentType = '';
  if (configType === 'JSON') {
    contentType = 'application/json;charset=utf-8';
  } else {
    contentType = 'application/x-www-form-urlencoded;charset=utf-8';
  }
  return axiosFn({
    url: url,
    method: method,
    params: params,
    body: body,
    configType: configType,
    contentType: contentType
  });
}

//request 拦截器
axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    if (error.message.indexOf('timeout') != -1) {
      console.error('服务请求超时，请您稍后再试！');
    } else {
      console.error('连接服务器失败');
    }
    return Promise.reject(error);
  }
);
//response 拦截器
axios.interceptors.response.use(
  response => {
    if (utils.isArray(response)) {
      return response;
    } else {
      return response.data;
    }
  },
  error => {
    if (error.message.indexOf('timeout') != -1) {
      console.error('服务请求超时，请您稍后再试！');
    } else {
      console.error('连接服务器失败');
    }
    return Promise.reject(error);
  }
);