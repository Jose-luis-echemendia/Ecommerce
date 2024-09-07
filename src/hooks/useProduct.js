import { useContext } from 'react'
import { ProductContext } from '../context/productContext'


export const useProduct = () => {
    const contextProduct = useContext(ProductContext)

    if (contextProduct === undefined) {
        throw new Error('useProduct must be used wihin a CartProvider')
    }

    return contextProduct
}
