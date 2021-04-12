
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebSocketService } from './web-socket.service';
import { ServiceWorkerModule } from '@angular/service-worker';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PushNotificationsModule } from 'ng-push';
import { PushNotificationsService } from './push-notify.service';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PushNotificationsModule,
    // ServiceWorkerModule.register('@angular/ngsw-worker.js', {
    //   enabled: true,
    //   registrationStrategy: 'registerWhenStable:30000'
    // }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [WebSocketService,PushNotificationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
