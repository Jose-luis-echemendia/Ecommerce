import { useContext } from 'react'
import { WishlistContext } from '../context/wishlistContext'


export const useWishlist = () => {
    const contextWishlist = useContext(WishlistContext)

    if (contextWishlist === undefined) {
        throw new Error('useWishlist must be used wihin a WishlistProvider')
    }

    return contextWishlist
}


