import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
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


export const getRecipesByCategory = async (category: string): Promise<Recipe[]> => {
  const q = query(
    recipeCollection,
    where('category', 'array-contains', category), 
    orderBy('createdAt', 'desc')
  )

  const snapshot = await getDocs(q)

  //You need composite index when you combine:
    //where + orderBy
    //multiple where conditions
    //array-contains + anything else

  return snapshot.docs.map(docSnap => {
    const data = docSnap.data()
    return {
      id: docSnap.id,
      recipeName: data.recipeName as string,     
      description: data.description as string,
      recipeImage: data.recipeImage as string,  
      category: data.category as string[],
      ingredients: data.ingredients || [],
      steps: data.steps || [],
      calories: data.calories || 0,
      cookTime: data.cookTime || 0,
      serveTo: data.serveTo || 0,
      createdAt: data.createdAt as string,
      imagePrompt: data.imagePrompt as string || ''
    } as Recipe
  })
}

export const getAllRecipes = async (): Promise<Recipe[]> => {
    const q = query(recipeCollection, orderBy('createdAt', 'desc'))

    const snapshot = await getDocs(q)
    return snapshot.docs.map(docSnap => {
      const data = docSnap.data()
      return {
        id: docSnap.id,
        recipeName: data.recipeName as string,     
        description: data.description as string,
        recipeImage: data.recipeImage as string,  
        category: data.category as string[],
        ingredients: data.ingredients || [],
        steps: data.steps || [],
        calories: data.calories || 0,
        cookTime: data.cookTime || 0,
        serveTo: data.serveTo || 0,
        createdAt: data.createdAt as string,
        imagePrompt: data.imagePrompt as string || ''
      } as Recipe
    })
}

export const getLatestRecipes = async (recipeLimit: number): Promise<Recipe[]> => {
    const q = query(recipeCollection, orderBy('createdAt', 'desc'),
    limit(recipeLimit)
  )

    const snapshot = await getDocs(q)
    return snapshot.docs.map(docSnap => {
      const data = docSnap.data()
      return {
        id: docSnap.id,
        recipeName: data.recipeName as string,     
        description: data.description as string,
        recipeImage: data.recipeImage as string,  
        category: data.category as string[],
        ingredients: data.ingredients || [],
        steps: data.steps || [],
        calories: data.calories || 0,
        cookTime: data.cookTime || 0,
        serveTo: data.serveTo || 0,
        createdAt: data.createdAt as string,
        imagePrompt: data.imagePrompt as string || ''
      } as Recipe
    })
}



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
