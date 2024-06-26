import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormControl, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.css'
})
export class shoppingListEditComponent implements OnInit, OnDestroy{
  @ViewChild('f',{ static: false }) form:NgForm;
  subscription:Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService:ShoppingListService){}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.onEditing.subscribe(
      (i: number)=>{
        this.editMode = true;
        this.editedItemIndex = i;
        this.editedItem = this.shoppingListService.getIngredient(i);
        
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(form: FormControl){
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }

    this.clear();
  }

  clear(){
    this.form.reset();
    this.editMode = false;
  }

  onDelete(form: FormControl){
    const name = form.value.name;
    const amount = form.value.amount? form.value.amount : 0;

    let oldAmount = this.shoppingListService.getAmountByName(name);
    if(amount === 0 || amount === oldAmount){
      this.shoppingListService.deleteIngredient(this.shoppingListService.getIndexByName(name));
      this.clear();
    }
    else if(oldAmount > amount){
      form.value.amount *= -1;
      this.editMode = false;
      this.onSubmit(form);
    }
  }

  isDeleteValid(form: FormControl){
    if(!(form.value.name))
      return false;
    const name = form.value.name;
    const amount = form.value.amount ? form.value.amount : 0;

    if(this.shoppingListService.getIndexByName(name) === -1)
      return false;
    
    let oldAmount = -1;
    oldAmount = this.shoppingListService.getAmountByName(name);
    if(amount < 0 || oldAmount === -1 || amount > oldAmount)
      return false;
    return true;
  }
}
