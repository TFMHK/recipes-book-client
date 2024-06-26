import { Component, OnDestroy, OnInit} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated = false;
  private subscription: Subscription;

  constructor(private dataStorageService: DataStorageService, private authService:AuthService, private route:Router){}

  ngOnInit(): void {
    this.subscription = this.authService.user.subscribe(
      user => this.isAuthenticated = !!user
    );
  }

  onSaveData(ride: boolean){
    if(this.route.url.endsWith('shopping-list'))
      this.dataStorageService.storeData('shopping-list', ride);
    else
      this.dataStorageService.storeData('recipes', ride);
  }

  onfetchData(ride: boolean){
    if(this.route.url.endsWith('shopping-list'))
      this.dataStorageService.fetchData('shopping-list', ride).subscribe(null,error => console.error('Error fetching recipes:', error));
    else
      this.dataStorageService.fetchData('recipes', ride).subscribe(null,error => console.error('Error fetching recipes:', error));
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
