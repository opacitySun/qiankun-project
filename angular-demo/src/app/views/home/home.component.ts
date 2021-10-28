import { Component, OnInit } from '@angular/core';
import { SessionService } from '@app/services/session.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public session:SessionService
  ) { }

  public data:any = {
    myIcon: faCoffee
  };

  ngOnInit(): void {
    const _this = this;
    _this.session.setState({
      step: 0
    });
  }

  //每次完成被投影组件内容的变更检测之后调用
  ngAfterContentChecked() {
    
  }

  changeState() {
    this.session.setState({
      step: 3
    });
  }

  onDateChange(event) {

  }

  currentDateFormat(date, format: string = 'yyyy-mm-dd HH:MM'): any {
    const pad = (n: number): string => (n < 10 ? `0${n}` : n.toString());
    return format
      .replace('yyyy', date.getFullYear())
      .replace('mm', pad(date.getMonth() + 1))
      .replace('dd', pad(date.getDate()))
      .replace('HH', pad(date.getHours()))
      .replace('MM', pad(date.getMinutes()))
      .replace('ss', pad(date.getSeconds()));
  }

  onMobileDateChange(event) {

  }
}
