import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredient[]>();
    onEditing = new Subject<number>();
    private ingredients: Ingredient[] =[
        new Ingredient('apples', 5),
        new Ingredient('Tomatoes',10),
      ];
    
    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(i:number){
        return this.ingredients[i];
    }

    getIndexByName(name: string){
        const i = this.ingredients.indexOf(
        this.ingredients.find(
        (value:Ingredient) => value.name === name));
        return i;
    }

    getAmountByName(name: string){
        return this.ingredients[this.getIndexByName(name)].amount;
    }

    addIngredient(ingredient: Ingredient){
        this._addIngredient(ingredient);
        this.ingredientsChanged.next(this.getIngredients());
    }
    private _addIngredient(ingredient: Ingredient){
        const i = this.getIndexByName(ingredient.name);
        if(i !== -1){
            this.ingredients[i].amount += ingredient.amount;
        } else {
            this.ingredients.push(ingredient);
        }
    }

    addMoltipleIngredients(ingredients: Ingredient[]){
        this._addMoltipleIngredients(ingredients);
        this.ingredientsChanged.next(this.getIngredients());
    }
    private _addMoltipleIngredients(ingredients: Ingredient[]){
        for (let ingredient of ingredients)
            this._addIngredient(ingredient);
    }

    updateIngredient(i:number, ingredient:Ingredient){
        this._updateIngredient(i, ingredient);
        this.ingredientsChanged.next(this.getIngredients());
    }
    private _updateIngredient(i:number, ingredient:Ingredient){
        this._deleteIngredient(i);
        this._addIngredient(ingredient);
    }

    deleteIngredient(i:number){
        this._deleteIngredient(i);
        this.ingredientsChanged.next(this.getIngredients());
    }
    private _deleteIngredient(i:number){
        this.ingredients.splice(i,1);
    }

    setIngredients(ingredients:Ingredient[], ride:boolean){
        this._setIngredients(ingredients, ride);
        this.ingredientsChanged.next(this.getIngredients());
    }
    private _setIngredients(ingredients:Ingredient[], ride:boolean){
        if(ride)
            this.ingredients = [];
        for (const ingredient of ingredients){
            this._addIngredient(new Ingredient(ingredient.name,ingredient.amount));
        }
    }
}