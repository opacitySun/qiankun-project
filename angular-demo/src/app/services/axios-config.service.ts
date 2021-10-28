import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import axios from 'axios';
// import * as JsEncryptModule from 'jsencrypt';
import {SessionService} from './session.service';
import {UtilsService} from './utils.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AxiosConfigService {

  constructor(
    public session: SessionService,
    public utils: UtilsService
  ) {
    //request 拦截器
    axios.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        let _this = this;
        _this.session.setState({
          loading: false
        });
        if (error.message.indexOf('timeout') != -1) {
          throw '服务请求超时，请您稍后再试！';
        } else {
          throw '连接服务器失败';
        }
        return Promise.reject(error);
      }
    );
    //response 拦截器
    axios.interceptors.response.use(
      response => {
        let _this = this;
        if (_this.utils.isArray(response)) {
          return response;
        } else {
          // if(typeof(response.data) === 'string'){
          //   response.data = JSON.parse(_this.getRSADecryptStr(response.data));
          // }
          return response.data;
        }
      },
      error => {
        let _this = this;
        _this.session.setState({
          loading: false
        });
        if (error.message.indexOf('timeout') != -1) {
          throw '服务请求超时，请您稍后再试！';
        } else {
          throw '连接服务器失败';
        }
        return Promise.reject(error);
      }
    );
  }

  private http: any;
  private apiPrefix: string = environment.production ? '' : '/api';
  private path: string = environment.production ? this.session.state.domain : 'http://' + window.location.host;
  private timeout: number = 1000 * 30;
  private baseURL: string = this.path + this.apiPrefix;
  private defaultContentType: string = 'application/json;charset=utf-8';
  private responseType: string = 'json';
  private axiosLoading: boolean = false;
  // private auth:string = 'tesla-ide:29394d7e57b417503e5d';
  private auth: string = 'sale-ide:t359yd8w9ui2e6624w85v';

  axiosFn({url, params, contentType, method, configType,timeout}) {
    let _this = this;
    if (!!_this.http) {
      _this = _this.http;
    }
    let axiosSetting: any = {
      method: method,
      url: url,
      responseType: _this.responseType,
      baseURL: _this.baseURL,
      timeout:timeout || _this.timeout,
      headers: {
        'Content-Type': contentType || _this.defaultContentType,
        'Authorization': "Basic " + _this.utils.stringToBase64(_this.auth)
      }
    };
    if (method === 'post' || method === 'POST') {
      axiosSetting.data = params;
    } else {
      axiosSetting.params = params;
    }
    return axios(axiosSetting);
  }

  axiosHttp({url, params, method = "POST", configType = "",timeout}) {
    let _this = this;
    if (!!_this.http) {
      _this = _this.http;
    }
    let newParams = '';
    let contentType = '';
    if (configType === 'JSON') {
      //参数RSA加密
      // params = _this.getRSAStr(JSON.stringify(params));
      // params = JSON.parse(_this.getRSADecryptStr(params));
      newParams = params;
      contentType = 'application/json;charset=utf-8';
    } else {
      newParams = '';
      Object.keys(params).forEach(key => {
        newParams += key + '=' + params[key] + '&'
      })
      newParams = newParams.substring(0, newParams.length - 1);
      contentType = 'application/x-www-form-urlencoded;charset=utf-8';
    }
    return _this.axiosFn({
      url: url,
      method: method,
      params: newParams,
      configType: configType,
      contentType: contentType,
      timeout:timeout
    });
  }

  rxHttp({url, params, method = "POST", configType = "",timeout}) {
    let _this: any = this;
    if (!!_this.http) {
      _this = _this.http;
    }
    return new Observable((observer) => {
      _this.axiosFn({
        url: url,
        method: method,
        params: params,
        configType: configType,
        contentType: "application/json;charset=utf-8",
        timeout:timeout
      }).then(response => {
        observer.next(response);
      }).catch(function (error) {
        observer.next(error);
      })
    });
  }

  /* 模拟rx请求 */
  testHttp(name) {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(name);
      }, 3000)
    });
  }

  //获取RSA加密字符串
  // getRSAStr(str: string) {
  //   let publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQChXXcqxZYE8Wo0/tJM9ZGcbaaOinp0mJmWz8FjS7hZWJCW0EEUuGU5kRq/ccytpwIxz9PaFeNpcmRQiroKnwkLz6CPK5MtiXpv2u2pkH/R4ICKKzIaAOy/+JGUfA/9AVEbqaNBSD2TrsMvpr/iOyJeJD+BQ2vD3XLDwSOyLBnpfwIDAQAB';
  //   //自定义的加密串
  //   let privateStr = "";
  //   let encrypt = new JsEncryptModule.JSEncrypt();
  //   encrypt.setPublicKey(publicKey);
  //   let signature = encrypt.encrypt(privateStr + str);
  //   return signature;
  // }
  //
  // //RSA解密字符串
  // getRSADecryptStr(str: string) {
  //   let privateKey = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKFddyrFlgTxajT+0kz1kZxtpo6KenSYmZbPwWNLuFlYkJbQQRS4ZTmRGr9xzK2nAjHP09oV42lyZFCKugqfCQvPoI8rky2Jem/a7amQf9HggIorMhoA7L/4kZR8D/0BURupo0FIPZOuwy+mv+I7Il4kP4FDa8PdcsPBI7IsGel/AgMBAAECgYBMb723IQlDJigtGlf75IcpFjfDZY1EFdULPzZYFtIoYG99QQDTE9W/QyDsdreBuo6rkcrEj4G9vVYPYOdniJX7pHJ1vUwNm++0yiFTakj+P/VKDS2aYljiqn6aaE0TuHk4K3BPKaFbusfEv9/z2QrJX+EJUHtc0NihBi5lB+NzoQJBAOQrf5xfoYacQniaoei3bLL0jAynDlrr4WACgBgi0hmS9sLdkbHGOrv3c8NzH6w0Lj3z5vG7RxnqcKLtSk1XEvUCQQC1DARhGx0dPtGSCW04hQBmSR1WD3xTvmU/Y4gL3AxILzaCn9z1sNzjl/vRDZhcmxwejHE9XWLmyDO5xtKPKcojAkB/t4l6slzryFO8xnGSnfmOQiySeIAkjJxe7Ydd+z+3aPgPI48F/3uo814tLSexcJPhwcCn1rh53SynRkOs/uxxAkA3XzGHsY85/piCHbf17Vet8Paz95CC3FyDAqH9XpOzEB2P3ezqh+lHApjV216aFCaJgVKw/frdsqV/UDvd5V4ZAkEAh8b4Y2UuAKqZ3sDFa7jx9GVhCndktn0u+q3zP8Bv14jOjoWkgnsQakjy5DkR+tU0mP24eHFiwtHEu/5gXFJh3A==';
  //   let encrypt = new JsEncryptModule.JSEncrypt();
  //   encrypt.setPrivateKey(privateKey);
  //   return encrypt.decrypt(str.trim());
  // }
}
