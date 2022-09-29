import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const contentRequest = req.clone({
      params: (req.params ? req.params : new HttpParams()).set('api_key', 'yUwM3GFwj1XxCagiof8jFxKK3kcM3sT6')
    })
    return next.handle(contentRequest);
  }

}
