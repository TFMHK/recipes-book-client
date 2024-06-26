import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Ingredient } from "./ingredient.model";

@Injectable({providedIn: 'root'})
export class DataStorageService {

    url = "http://localhost:3000/";

    constructor(private http: HttpClient, private recipeService: RecipeService, private shoppingListService:ShoppingListService, private authService: AuthService) {}

    storeData(path: string, ride: boolean) {
        let data = path === "shopping-list" ? this.shoppingListService.getIngredients() : this.recipeService.getRecipes();
        this.http.put(this.url + path + '?ride=' + ride, data).pipe(take(1)).subscribe();
    }

    fetchData(path: string, ride: boolean) {
        let data;
        if(path === "shopping-list")
            data = this.http.get<Ingredient[]>(this.url + path + '?ride=' + ride).pipe(tap(ingredients => this.shoppingListService.setIngredients(ingredients, ride)));
        else
            data =  this.http.get<Recipe[]>(this.url + path + '?ride=' + ride).pipe(tap(recipes => this.recipeService.setRecipes(recipes, ride)));
        return data;
    }

    SearchData(path: string, searchTerm: string) {
        return this.http.get<Recipe[]>(this.url + path + '?search=' + searchTerm).pipe(take(1));
    }

    addRating(rating: number, recipe: Recipe){
        return this.http.post(this.url + 'recipe-book' + "?commentOrRate=rating", {rating: rating, recipe: recipe}).pipe(take(1));
    }

    addComment(comment:string, recipe: Recipe){
        return this.http.post(this.url + 'recipe-book' + "?commentOrRate=comment", {comment: comment, recipe: recipe}).pipe(take(1));
    }
}