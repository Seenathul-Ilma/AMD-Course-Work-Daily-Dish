import { auth, db } from "@/config/firebase"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

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
        displayName: fullname ,
        photoURL: profileImage
    })
    await setDoc(doc(db, "users", userCredential.user.uid), {
        name: fullname,
        role: "",
        email,
        profileImage,
        createdAt: new Date()
    })
    return userCredential.user
}

export const logoutUser = async () => {
    await signOut(auth)
    AsyncStorage.clear()
    return
}