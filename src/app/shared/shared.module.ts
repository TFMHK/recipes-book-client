import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { DropdownDirective } from "./dropdown.directive";
import { StarsRatingComponent } from './stars-rating/stars-rating.component';
import { SearchLineComponent } from './search-line/search-line.component';
import { PermissionsComponent } from "./permissions/permissions.component";
import { RecipeRatingModalComponent } from './recipe-rating-modal/recipe-rating-modal.component';

@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        DropdownDirective,
        StarsRatingComponent,
        SearchLineComponent,
        PermissionsComponent,
        RecipeRatingModalComponent,
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        DropdownDirective,
        CommonModule,
        FormsModule,
        StarsRatingComponent,
        SearchLineComponent,
        PermissionsComponent,
        RecipeRatingModalComponent,
    ]
})
export class SharedModule {}