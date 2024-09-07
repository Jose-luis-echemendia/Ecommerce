import { useContext } from 'react'
import { CategoryContext } from '../context/categoryContext'


export const useCategory = () => {
    const contextCategory = useContext(CategoryContext)

    if (contextCategory === undefined) {
        throw new Error('useCategory must be used wihin a CartProvider')
    }

    return contextCategory
}
