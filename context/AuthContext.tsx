import { auth } from "@/config/firebase";
import { useLoader } from "@/hooks/useLoader";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextType {
    user: User | null
    loading: boolean
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: false
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const { showLoader, hideLoader, isLoading } = useLoader()
   const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        // Show a loader while Firebase checks if a user is logged in
        showLoader()  
        
        // Listen for auth state changes (when app starts, login, logout, or token refreshes)
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)  // Update state with current user or null
            hideLoader() // Hide loader once auth state is known (You can safely render: Home screen OR Login screen)
        })

        // cleanup function (component unmount) : remove the listener when the component unmounts
        // React calls this automatically when:
        // - the component unmounts
        // - the app navigates away
        // - the effect is destroyed
        //
        // unsubscribe() removes the Firebase auth listener
        // This prevents memory leaks and duplicate listeners
        return () => unsubscribe()
    }, [])  // Auth listener should be set once
            // We don’t want to re-register listener on every render

    return (
        <AuthContext.Provider value={{ user, loading: isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}