import { useContext } from 'react'
import { SizesContext } from '../context/sizeContext'


export const useSizes = () => {
    const contextSizes = useContext(SizesContext)

    if (contextSizes === undefined) {
        throw new Error('useSizes must be used wihin a CartProvider')
    }

    return contextSizes
}
