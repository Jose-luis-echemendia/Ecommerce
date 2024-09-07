import { useContext } from 'react'
import { ProfileContext } from '../context/profileContext'


export const useProfile = () => {
    const contextProfile = useContext(ProfileContext)

    if (contextProfile === undefined) {
        throw new Error('useProfile must be used wihin a ProfileProvider')
    }

    return contextProfile
}
