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
const favouriteCollection = collection(db, "favourites");

export const getAllFavourites = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated.");
  const q = query(
    favouriteCollection,
    where("userId", "==", user.uid),
    orderBy("createdAt", "desc"),
  );

  const snapshot = await getDocs(q);

  const recipes = await Promise.all(
    snapshot.docs.map(async (docSnap) => {
      const data = docSnap.data();
      const recipeRef = doc(db, "recipe", data.recipeId);
      const recipeSnap = await getDoc(recipeRef);
            if (!recipeSnap.exists()) return null;

            return {
        id: recipeSnap.id,              // required by Recipe type
        ...recipeSnap.data(),           // recipe fields
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

  // to prevent duplicate favourites
  const q = query(
    favouriteCollection,
    where("recipeId", "==", recipeId),
    where("userId", "==", user.uid),
  );

  const existing = await getDocs(q);

  if (!existing.empty) {
    throw new Error("Already added to your cravings.");
  }

  await addDoc(favouriteCollection, {
    recipeId,
    userId: user.uid,
    createdAt: serverTimestamp(),
  });

  await updateDoc(recipeRef, {
    isSaved: true,
  });

};

export const removeFromFavouriteByRecipeId = async (recipeId: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated.");

  const q = query(
    favouriteCollection,
    where("recipeId", "==", recipeId),
    where("userId", "==", user.uid)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) throw new Error("Recipe not in your cravings list.");

  const favDoc = snapshot.docs[0];

  await deleteDoc(doc(db, "favourites", favDoc.id));

  const recipeRef = doc(db, "recipe", recipeId);
  await updateDoc(recipeRef, { isSaved: false });
};

