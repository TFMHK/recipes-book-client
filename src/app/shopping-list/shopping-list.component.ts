import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Ingredient[];
  private sub:Subscription;

  constructor(private shoppingListService:ShoppingListService){}

  ngOnInit(){
    this.ingredients = this.shoppingListService.getIngredients();
    this.sub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients:Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  onEditItem(i: number){
    this.shoppingListService.onEditing.next(i);
  }
}
