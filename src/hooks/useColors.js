import { useContext } from 'react'
import { ColorsContext } from '../context/colorContext'


export const useColors = () => {
    const contextColors = useContext(ColorsContext)

    if (contextColors === undefined) {
        throw new Error('useColors must be used wihin a CartProvider')
    }

    return contextColors
}
