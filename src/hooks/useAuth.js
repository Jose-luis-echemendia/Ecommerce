import { useContext } from 'react'
import { AuthContext } from '../context/authContext'


export const useAuth = () => {
    const contextAuth = useContext(AuthContext)

    if (contextAuth === undefined) {
        throw new Error('useAuth must be used wihin a CartProvider')
    }

    return contextAuth
}
