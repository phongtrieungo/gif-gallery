import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContentTypeInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let contentRequest = req;

    const headers = contentRequest.headers.set('Content-type', 'application/json');
    contentRequest = contentRequest.clone({ headers });

    return next.handle(contentRequest);
  }

}
