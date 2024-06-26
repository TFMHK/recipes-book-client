import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import { Router } from "@angular/router";

const url = "http://localhost:3000/auth/"

@Injectable({providedIn: 'root'})
export class AuthService{
    user = new BehaviorSubject<User>(null);
    token = '0';
    private tokenExpTimer = null;
    
    constructor(private readonly http: HttpClient, private router:Router){}

    async signUp(username: string, email:string, password:string){
        return await this.http.post(url+"signup",{username:username, email:email, password:password})
            .pipe(catchError(this.handleError), tap(await this.handleUsers.bind(this)));
    }

    async signIn(username: string, password:string){
        return await this.http.post(url+"signin",{username:username, password:password})
        .pipe(catchError(this.handleError), tap(await this.handleUsers.bind(this)));
    }

    autoLogin(){
        if (typeof window === 'undefined' || !localStorage.getItem('userData')) {
            return;
        }
        
        let userData = JSON.parse(localStorage.getItem('userData'));
        if(!userData)
            return;
        
        userData._tokenExpirationDate = new Date(userData._tokenExpirationDate);

        if(new Date() < userData._tokenExpirationDate){
            this.user.next(userData);
            this.token = userData._token;
            this.autoLogout(userData._tokenExpirationDate.getTime() - new Date().getTime());
        }
    }

    logout(){
        this.user.next(null);
        localStorage.removeItem('userData');
        this.token = '0';
        if(this.tokenExpTimer)
            clearTimeout(this.tokenExpTimer);
        this.tokenExpTimer = null
        this.router.navigate(['/authorization']);
    }

    autoLogout(expraitionDuration: number){
        this.tokenExpTimer = setTimeout(()=>this.logout(), expraitionDuration);
    }

    private handleError(errorMessage){
        let error = "Unknown error!";
        if(errorMessage.error)
            error = errorMessage.error.message;
        return throwError(error);
    }

    private async handleUsers(resData){
        const {username, email, password, access_token, timeToExpire} = <any>resData;
        const tokenExpirationDate = new Date(new Date().getTime() + (+timeToExpire*1000));
        const user = new User(username, email, password, access_token, tokenExpirationDate);
        this.autoLogout(+timeToExpire*1000);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
        this.token = access_token;
    }
}