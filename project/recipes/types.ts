import { Router } from "expo-router";

export interface IRecipes {
  id: number;
  title: string;
  course: string;
  cuisine: string;
  mainIngredient: string;
  description: string;
  source: string;
  url: string;
  urlHost: string;
  prepTime: number;
  cookTime: number;
  totalTime: number;
  servings: number;
  yield: number;
  ingredients: string;
  directions: string;
  tags: string;
  rating: string;
  publicUrl: string;
  photoUrl: string;
  private: string;
  nutritionalScoreGeneric: string;
  calories: number;
  fat: string;
  cholesterol: string;
  sodium: string;
  sugar: string;
  carbohydrate: string;
  fiber: string;
  protein: string;
  cost: string;
}

export interface IShoppingList {
  id:number,
  ingredients:string,
} 

export interface IImagePicker{
  image: string | null;
  setImage: (image: string | null) => void;
}

export interface IRouter {
  router: Router;
}