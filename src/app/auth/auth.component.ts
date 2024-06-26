import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app—auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent{ 
    signUp = false;
    isLoading = false;
    error:string = null;

    constructor(private authService:AuthService, private readonly route: Router){}

    async OnSubmit(form: NgForm){
        this.isLoading = true;
        this.error = null;
        let subscription;
        const {username, email, password} = form.value;

        if(this.signUp){
            subscription = (await this.authService.signUp(username, email, password))
        } else {
            subscription = (await this.authService.signIn(username, password));
        }
        subscription.subscribe(
            resData => {
                this.route.navigate(['/recipes']);
            }, 
            errorMessage => {
                this.error = errorMessage;
                this.isLoading = false;
            }
        );

        form.reset();
    }

    valid(form: FormControl){
        if(!this.signUp)
            return true;
        if(!(form.value.password) || !(form.value.configurePassword))
            return false;
        if(form.value.configurePassword === form.value.password)
            return true;
        return false;
    }
}