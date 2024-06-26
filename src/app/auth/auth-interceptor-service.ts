import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authService:AuthService){}

    intercept(req: HttpRequest<any>, next:HttpHandler){
        return next.handle(req.clone(req.clone({
            setHeaders: { Authorization: `Bearer ${this.authService.token}` }})));
    }
}