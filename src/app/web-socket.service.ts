import { Injectable } from "@angular/core";

declare var require: any;
var SockJs = require("sockjs-client");
var Stomp = require("stompjs");



@Injectable()
export class WebSocketService {
    subs:any;
    readonly VAPID_PUBLIC_KEY ="BFA9FA7upFtgYHsMIWc7giWYk5LhmX10QBJWyA-1vg9VBY3qfi1coQLjWKZEczwxcUmmU9Dzjbz24jTb3DmmWtU";
privateKey="0Lo0LCj0PcbpxzIyqTlBCmHCuIEy9_aCWbcVqBG9lqs";


    // Open connection with the back-end socket
    public connect() {
        let socket = new SockJs(`https://demo-ssedssd.herokuapp.com/socket`);

        let stompClient = Stomp.over(socket);

        return stompClient;
    }
    addPushSubscriber(sub:any){
        this.subs.push(sub);
    }
     notificationPayload = {
        "notification": {
            "title": "Angular News",
            "body": "Newsletter Available!",
            "icon": "assets/main-page-logo-small-hat.png",
            "vibrate": [100, 50, 100],
            "data": {
                "dateOfArrival": Date.now(),
                "primaryKey": 1
            },
            "actions": [{
                "action": "explore",
                "title": "Go to the site"
            }]
        }
    };

    notifyMsg(){
        
    }
}