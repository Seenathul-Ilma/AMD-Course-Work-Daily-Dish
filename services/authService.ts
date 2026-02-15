import { auth, db } from "@/config/firebase"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"

export const login = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password)
}

export const registerUser = async (
    fullname: string,
    email: string,
    password: string
) => {
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    )

    const usernamefirstLetter = fullname.trim().charAt(0).toUpperCase()

    const profileImage =
        "https://ui-avatars.com/api/?name=" +
        usernamefirstLetter +
        "&background=8B593E&color=FFF8F3"

    await updateProfile(userCredential.user, {
        displayName: fullname,
        photoURL: profileImage
    })
    await setDoc(doc(db, "users", userCredential.user.uid), {
        name: fullname,
        role: "",
        email,
        profileImage,
        userFavourites: [],
        createdAt: new Date()
    })
    return userCredential.user
}

export const updateUserProfileImage = async (userId: string, imageUrl: string) => {
    // 1. Update the 'users' collection in Firestore
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { profileImage: imageUrl });

    // 2. Update the Firebase Auth profile (for the current session)
    if (auth.currentUser) {
        await updateProfile(auth.currentUser, { photoURL: imageUrl });
    }
}

export const logoutUser = async () => {
    await signOut(auth)
    AsyncStorage.clear()
    return
}

export const getCurrentUserData = async (): Promise<any | null> => {
    const user = auth.currentUser;
    if (!user) return null;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        return { uid: userSnap.id, ...userSnap.data() };
    }
    return null;
}