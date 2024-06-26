import { Ingredient } from "../shared/ingredient.model";
import { Permission } from "../shared/permissions/permission.model";

export interface Comment{
    username:string; 
    comment: string;
}

export class Recipe{
    public id: number;
    public name: string;
    public description: string;
    public directions: string;
    public imagePath: string;
    public ingredients:Ingredient[];
    public visible = true;
    public permissions:Permission[];
    public rating = 3;
    public ratingAmount = 0;
    public comments: Comment[];
    public isSaved = false;

    constructor(name: string, description: string, directions: string, imagePath: string, ingredients:Ingredient[], visible?: boolean, permissions?:Permission[], comments?:Comment[]){
        this.id = Math.random() * 1000000000;
        this.name = name;
        this.description = description;
        this.directions = directions;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
        this.visible = visible;
        this.permissions = permissions??[];
        this.comments = comments??[];
    }
}