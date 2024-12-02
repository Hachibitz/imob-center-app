import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgrokHeaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let modifiedRequest = request.clone()
    if (request.url.includes('ngrok.io')) {
      modifiedRequest = request.clone({
        setHeaders: {
          "ngrok-skip-browser-warning": "69420",
        }
      });
    }

    return next.handle(modifiedRequest);
  }
}
