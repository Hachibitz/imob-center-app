import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { register } from 'swiper/element/bundle';
import { NgrokHeaderInterceptor } from './interceptor/ngrok-header-interceptor';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  providers: [
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: NgrokHeaderInterceptor, multi: true },
  ],
  imports: [IonApp, IonRouterOutlet, HttpClientModule],
})
export class AppComponent {
  constructor() {}
}
