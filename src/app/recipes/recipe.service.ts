
import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Subject } from "rxjs/Subject";

@Injectable({providedIn: 'root'})
export class RecipeService{
    recipeChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [];

    setRecipes(recipes: Recipe[], ride: boolean){
        console.log('setRecipes', recipes, this.recipes);
        this.recipes = ride ? recipes : [...this.recipes, ...recipes];
        this.cleanDop();
        this.recipeChanged.next(this.getRecipes());
    }

    getRecipes(){
        return this.recipes.slice();
    }
    
    getRecipe(id:number){
        return this.recipes[id];
    }

    addRecipe(recipe:Recipe){
        console.log("addRecipe", recipe, this.isDop(recipe));
        this.recipes.push(recipe);
        if(this.isDop(recipe))
            this.recipes.pop();
        this.recipeChanged.next(this.getRecipes());
    }

    updateRecipe(id:number, recipe:Recipe){
        console.log("updateRecipe", recipe);
        const {name, description, directions, imagePath, ingredients, visible} = recipe;
        this.recipes[id].name = name;
        this.recipes[id].description = description;
        this.recipes[id].directions = directions;
        this.recipes[id].imagePath = imagePath;
        this.recipes[id].ingredients = ingredients;
        this.recipes[id].visible = visible;
        this.recipes[id].isSaved = false;
        this.recipeChanged.next(this.getRecipes());
    }

    deleteRecipe(id:number){
        this.recipes.splice(id,1);
        this.recipeChanged.next(this.getRecipes());
    }

    cleanDop(){
        for (let recipe of this.recipes.reverse()) {
            if (this.isDop(recipe))
                this.recipes.splice(this.recipes.findIndex(r => r === recipe),1);
        }
    }

    isDop(recipe: Recipe){
        let i = this.recipes.findIndex(r => r === recipe);
        return this.recipes.findIndex((r:Recipe, index:number) => r.id === recipe.id && i !== index) !== -1;
    }
}