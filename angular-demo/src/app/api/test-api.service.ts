import { Injectable } from '@angular/core';
import { AxiosConfigService } from '@app/services/axios-config.service';
import { SessionService } from '@app/services/session.service';

@Injectable({
  providedIn: 'root'
})
export class TestApiService {

  constructor(
    public http:AxiosConfigService,
    public session:SessionService
  ) { }

  private request:any = this.http.axiosHttp;
  private token:string = this.session.state.token;
  private prePath:string = '/';

  //获取用户信息
  getList(params) {
    return this.request({
      url: `${this.prePath}/list`,
      method: 'post',
      configType: 'JSON',
      params
    })
  }
}
