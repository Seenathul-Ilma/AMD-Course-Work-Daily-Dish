import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { Category } from '@/types/category'

/* export interface Category {
    id: string
    name: string
    photoURL: string
    createdAt: string
} */

const categoriesCollection = collection(db, 'categories')

export const getAllCategories = async (): Promise<Category[]> => {
    const q = query(categoriesCollection, orderBy('createdAt', 'asc'))

    const snapshot = await getDocs(q)
    return snapshot.docs.map(docSnap => {
        const data = docSnap.data()
        return {
            id: docSnap.id,
            name: data.name as string,
            photoURL: data.photoURL as string,
            createdAt: data.createdAt as string
        }
    })
}
