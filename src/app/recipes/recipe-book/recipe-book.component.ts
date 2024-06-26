import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css']
})
export class RecipeBookComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;
  searchTerm: string = '';

  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    this.subscription = this.dataStorageService.fetchData("recipe-book", true).subscribe(
      (recipes: Recipe[]) => {
        console.log('Recipes fetched successfully:', recipes);
        this.recipes = recipes;
      },
      (error) => {
        console.error('Error fetching recipes:', error);
      }
    );
  }  

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filteredRecipes(): Recipe[] {
    if (!this.searchTerm.trim()) {
      return this.recipes;
    }
    return this.recipes;
  }

  onSearch(searchTerm: string): void {
    this.dataStorageService.SearchData("recipe-book", this.searchTerm).subscribe(
      (recipes: Recipe[]) => {
        console.log('Recipes fetched successfully:', recipes);
        this.recipes = recipes.reverse();
      },
      (error) => {
        console.error('Error fetching recipes:', error);
      }
    );
    this.searchTerm = searchTerm;
  }
}