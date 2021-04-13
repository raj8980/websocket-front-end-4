
import { Component, OnInit } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { HttpService } from './http.service';
import { PushNotificationsService } from './push-notify.service';

import { WebSocketService } from './web-socket.service';



// const vapidKeys = {
//   "publicKey":"BFA9FA7upFtgYHsMIWc7giWYk5LhmX10QBJWyA-1vg9VBY3qfi1coQLjWKZEczwxcUmmU9Dzjbz24jTb3DmmWtU",
//   "privateKey":"0Lo0LCj0PcbpxzIyqTlBCmHCuIEy9_aCWbcVqBG9lqs"
// };

// 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  subscr: any;
  public notifications = 0;
  readonly VAPID_PUBLIC_KEY = "BFA9FA7upFtgYHsMIWc7giWYk5LhmX10QBJWyA-1vg9VBY3qfi1coQLjWKZEczwxcUmmU9Dzjbz24jTb3DmmWtU";
  detailsSub: any[] = [];

  constructor(private webSocketService: WebSocketService,
    private _pushNotifications: PushNotificationsService, readonly swPush: SwPush,
    private updates: SwUpdate, private httpService: HttpService) {
      updates.available.subscribe(event => {
        console.log('current version is', event.current);
        console.log('available version is', event.available);
      });
      updates.activated.subscribe(event => {
        console.log('old version was', event.previous);
        console.log('new version is', event.current);
      });
      updates.available.subscribe(event => {
        
          updates.activateUpdate().then(() => document.location.reload());
        
      });
      
    this._pushNotifications.requestPermission();

    let stompClient = this.webSocketService.connect();

    stompClient.connect({}, (_frame: any) => {
      stompClient.subscribe('/topic/notification', (_notifications: { body: string; }) => {
        this.notifications = JSON.parse(_notifications.body).count;
        this.notify();
      })
    });
  }

  public async subscribeToNotifications() {
    try {
      const sub = await this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      });
      this.httpService.getUserDetails(sub).subscribe();
      // TODO: Send to server.
    } catch (err) {
      console.error('Could not subscribe due to:', err);
    }

  }

  notify() {

    let data: Array<any> = [];

    data.push({ //set options
      data: "Rubbor Board",
      body: "Trade created",
      icon: "assets/rubber-board.jpeg" //adding an icon
    });

    this._pushNotifications.generateNotification(data);
  }
}




