
import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
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
  readonly VAPID_PUBLIC_KEY ="BFA9FA7upFtgYHsMIWc7giWYk5LhmX10QBJWyA-1vg9VBY3qfi1coQLjWKZEczwxcUmmU9Dzjbz24jTb3DmmWtU";

  constructor(private webSocketService: WebSocketService,
    private _pushNotifications: PushNotificationsService,  private swPush: SwPush) {
    //   this.swPush.requestSubscription({
    //     serverPublicKey: this.VAPID_PUBLIC_KEY
    // })
    // .then(sub => console.log("ses:  "+sub))
    // .catch(err => console.error("Could not subscribe to notifications", err));

    this._pushNotifications.requestPermission();


    let stompClient = this.webSocketService.connect();
    stompClient.connect({}, (_frame: any) => {

      stompClient.subscribe('/topic/notification', (_notifications: { body: string; }) => {

        this.notifications = JSON.parse(_notifications.body).count;

        this.notify();
      })
    });
    self.addEventListener('push', function (event: any) {
      if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
      }

      var data;
      if (event) {
        data = event?.data.json();
      }
      var title = data?.title || "Something Has Happened";
      var message = data.message || "Here's something you might want to check out.";
      var icon = "images/new-notification.png";

      var notification = new self.Notification(title, {
        body: message,
        tag: 'simple-push-demo-notification',
        icon: icon
      });

      notification.addEventListener('click', function () {
        // if (clients.openWindow) {
        //   clients.openWindow('https://example.blog.com/2015/03/04/something-new.html');
        // }
      });
    });
  }
  notify() {
    console.log("here")
    let data: Array<any> = [];
    data.push({ //set options
      data: "Rubbor Board",
      body: "Trade created",
      icon: "assets/rubber-board.jpeg" //adding an icon
    });


    this._pushNotifications.generateNotification(data);
  }


}
