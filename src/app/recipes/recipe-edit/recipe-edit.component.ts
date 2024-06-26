import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Permission } from '../../shared/permissions/permission.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  id: number;
  editMode = false;
  givePer = false;

  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeDirections = '';
    let recipeIngredients = new FormArray([]);
    let recipeVisibility = true;
    let recipePermissions: Permission[] = [];

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      recipeDirections = recipe.directions;
      recipeVisibility = recipe.visible;
      for (let ingredient of recipe.ingredients) {
        recipeIngredients.push(
          new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, this.amountValidator])
          })
        );
      }
      recipePermissions = recipe.permissions??[];
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'directions': new FormControl(recipeDirections, Validators.required),
      'ingredients': recipeIngredients,
      'visible': new FormControl(recipeVisibility, Validators.required),
      'permissions': new FormControl(recipePermissions)
    });
  }

  onSubmit() {
    const { name, imagePath, description, directions, ingredients, visible, permissions } = this.recipeForm.value;
    const newRecipe = new Recipe(name, description, directions, imagePath, ingredients, visible, permissions);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  get controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, this.amountValidator])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  addPermission(permission: { username: string; permission: Permission }) {
    const permissions = this.recipeForm.get('permissions').value;
    permissions.push(permission);
    this.recipeForm.patchValue({ permission });
    this.givePer = false;
  }

  amountValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value > 0) {
      return null;
    }
    return { 'amountLessThanO': true };
  }
}