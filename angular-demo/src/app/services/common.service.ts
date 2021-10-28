import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '@app/services/utils.service';
import { SessionService } from '@app/services/session.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    public router: Router,
    public utils: UtilsService,
    public session: SessionService
  ) { }

  //检查保单状态
  async getPolicyStatus() {
    
  }

}
