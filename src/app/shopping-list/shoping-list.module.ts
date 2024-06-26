import { NgModule } from "@angular/core";
 
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShoppingListComponent } from "./shopping-list.component";
import { shoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { AuthGuard } from "../auth/auth.guard";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        ShoppingListComponent,
        shoppingListEditComponent
    ],
    imports: [
        RouterModule.forChild([{
            path: '', component: ShoppingListComponent, canActivate:[AuthGuard], children:[
                {path: '', component: ShoppingListModule}
            ]
        }]), 
        SharedModule, 
        FormsModule,
        ReactiveFormsModule
    ]
})
export class ShoppingListModule{}