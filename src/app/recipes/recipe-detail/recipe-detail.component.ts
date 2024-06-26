import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit{
  recipe:Recipe;
  id: number;
  commentAndRate = false;
  error = "";

  constructor(
    private shoppingListService:ShoppingListService,
    private recipeService:RecipeService,
    private dataStorageService:DataStorageService,
    private route:ActivatedRoute,
    private router:Router){}

  ngOnInit(){
    this.route.params.subscribe(
        (params:Params)=> 
        {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
    );
  }

  onAddToShoppingList(){
    this.shoppingListService.addMoltipleIngredients(this.recipe.ingredients);
    this.router.navigate(['../../shopping-list'],{relativeTo:this.route});
  }

  onEdit(){
    this.router.navigate(['../../recipes',this.id,'edit'],{relativeTo:this.route});
  }

  onDelete(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  onClick(){
    this.commentAndRate = true;
  }

  onRatingAdded(rating: number) {
    this.dataStorageService.addRating(rating, this.recipe)
      .subscribe(response => {
        console.log('Rating added successfully:', response);
      }, error => {
        this.error = "Failed to add rating: can't rate while user is not connected";
      });
  }

  onCommentAdded(comment: string) {
    this.dataStorageService.addComment(comment, this.recipe)
      .subscribe(response => {
        console.log('Comment added successfully:', response);
      }, error => {
        this.error = "Failed to add comment: can't comment while user is not connected";
      });
  }
}
