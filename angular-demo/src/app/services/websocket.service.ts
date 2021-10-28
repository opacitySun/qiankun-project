import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { $WebSocket, WebSocketSendMode } from 'angular2-websocket/angular2-websocket';
import { UtilsService } from '@app/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor(
    public utils:UtilsService
  ) { }

  private url = 'ws://192.168.99.145:1202/tesla/imserver/SN20210129N110100ZERN1W?access_token=0bfddcdf-1a83-43bc-918d-c50b0fe9ea93';  
  private ws: any = null;

  sendMessage(message){
    const _this = this;
    _this.ws.send(message).subscribe(
      (msg)=> {
        console.log("next", msg.data);
      },
      (msg)=> {
        console.log("error", msg);
      },
      ()=> {
        console.log("complete");
      }
    );
  }
  
  getMessages() {
    const _this = this;
    if("WebSocket" in window){
      let observable = new Observable(observer => {
        if(!_this.utils.hasValue(_this.ws)){
          _this.ws = new $WebSocket(_this.url);
        }
        _this.ws.onMessage(
          (msg: MessageEvent)=> {
            observer.next(msg.data);
          },
          {autoApply: false}
        );
      });
      return observable;
    }else{
      console.log("浏览器不支持WebSocket");
    }
  }

  connectWebsocket() {
    const _this = this;
    if("WebSocket" in window){
      let url = "ws://192.168.99.145:1202/tesla/imserver/SN20210129N110100ZERN1W?access_token=0bfddcdf-1a83-43bc-918d-c50b0fe9ea93";
      _this.ws = new $WebSocket(url);
      _this.ws.onMessage(
        (msg: MessageEvent)=> {
          console.log("onMessage ", msg.data);
        },
        {autoApply: false}
      );
    }else{
      console.log("浏览器不支持WebSocket");
    }
  }
}
