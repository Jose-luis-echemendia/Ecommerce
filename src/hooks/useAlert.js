import { useContext } from 'react'
import { AlertContext } from '../context/alertContext'


export const useAlert = () => {
    const contextAlert = useContext(AlertContext)

    if (contextAlert === undefined) {
        throw new Error('useAlert must be used wihin a CartProvider')
    }

    return contextAlert
}
