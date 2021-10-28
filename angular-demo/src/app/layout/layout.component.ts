import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SessionService } from '@app/services/session.service';
import { UtilsService } from '@app/services/utils.service';
import { CommonService } from '@app/services/common.service';
import { TestApiService } from '@app/api/test-api.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public testApi: TestApiService,
    public utils: UtilsService,
    public session: SessionService,
    public common: CommonService,
    public ngZone: NgZone
  ) { 
    const _this = this;
    //监听session中的state变化
    _this.ngZone.run(()=>{
      _this.subscription = _this.session.getState().subscribe(state => {
        window.document.title = state.title;
      });
    })
  }

  //rxjs的订阅对象
  public subscription: Subscription;
  //全局state
  private state:any = this.session.getSessionState();
  //是否重载
  public rerender:boolean = false;

  //组件加载完成
  ngOnInit(): void {
    const _this = this;
    _this.pageInit();
  }

  ngAfterContentChecked() {
    
  }

  //dom加载完成的生命周期
  ngAfterViewInit() {
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  //页面初始化
  pageInit() {
    const _this = this;
    _this.rerender = true;
  }
}
