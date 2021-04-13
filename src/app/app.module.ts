

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebSocketService } from './web-socket.service';
import { ServiceWorkerModule } from '@angular/service-worker';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PushNotificationsModule } from 'ng-push';
import { PushNotificationsService } from './push-notify.service';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PushNotificationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true
    }),
   
  ],
  providers: [WebSocketService,PushNotificationsService,HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
