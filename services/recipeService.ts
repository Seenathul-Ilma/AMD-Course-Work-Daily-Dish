import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { Recipe } from "@/types/recipe";
const auth = getAuth();
const recipeCollection = collection(db, "recipe");

export const addRecipe = async (
  recipe: Recipe,
  recipeImage?: string
) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated.");

  await addDoc(recipeCollection, {
    ...recipe,
    recipeImage: recipeImage || "",
    userId: user.uid,
    createdAt: serverTimestamp(),
  });
};

/* export const addRecipe = async (
  recipeName: string,
  description: string,
  ingredients: string[],
  steps: string[],
  //categoryId: string,
  calories: number,
  cookTime: number,
  serveTo: number,
  imagePrompt: string,
  recipeImage?: string,
) => {
  const user = auth.currentUser;

  if (!user) throw new Error("User not authenticated.");

  await addDoc(recipeCollection, {
    recipeName,
    description,
    ingredients,
    steps,
    //categoryId,
    calories,
    cookTime,
    serveTo,
    imagePrompt,
    recipeImage: recipeImage || "",
    userId: user.uid,
    createdAt: new Date().toISOString(),
  });
}; */
