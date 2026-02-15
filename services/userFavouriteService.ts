import { db } from "@/config/firebase";
import { Recipe } from "@/types/recipe";
import { getAuth } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";
const auth = getAuth();
//const favouriteCollection = collection(db, "favourites");

export const getAllFavourites = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated.");

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return [];

  const userData = userSnap.data();
  const favouriteIds = userData.userFavourites || [];

  if (favouriteIds.length === 0) return [];

  const recipes = await Promise.all(
    favouriteIds.map(async (recipeId: string) => {
      const recipeRef = doc(db, "recipe", recipeId);
      const recipeSnap = await getDoc(recipeRef);
      if (!recipeSnap.exists()) return null;

      return {
        id: recipeSnap.id,
        ...recipeSnap.data(),
      } as Recipe;
    }),
  );
  return recipes.filter((r): r is Recipe => r !== null);
};

export const addToFavourite = async (recipeId: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated.");

  const recipeRef = doc(db, "recipe", recipeId);
  const recipeSnap = await getDoc(recipeRef);

  if (!recipeSnap.exists()) {
    throw new Error("Recipe not found.");
  }

  const userRef = doc(db, "users", user.uid);
  await updateDoc(userRef, {
    userFavourites: arrayUnion(recipeId)
  });
};

export const removeFromFavouriteByRecipeId = async (recipeId: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated.");

  const userRef = doc(db, "users", user.uid);
  await updateDoc(userRef, {
    userFavourites: arrayRemove(recipeId)
  });
};

