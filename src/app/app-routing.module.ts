import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { RecipeBookComponent } from './recipes/recipe-book/recipe-book.component';
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipesResolveService } from "./recipes/recipes-resolver.service";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipe-book', pathMatch: 'full' },
    { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
    { path: 'shopping-list', loadChildren: () => import('./shopping-list/shoping-list.module').then(m => m.ShoppingListModule) },
    { path: 'authorization', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    {
        path: 'recipe-book',
        component: RecipeBookComponent,
        children: [
            { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolveService] }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {}