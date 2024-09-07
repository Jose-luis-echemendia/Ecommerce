import { useContext } from 'react'
import { ReviewsContext } from '../context/reviewsContext'


export const useReviews = () => {
    const contextReviews = useContext(ReviewsContext)

    if (contextReviews === undefined) {
        throw new Error('useReviews must be used wihin a ReviewsProvider')
    }

    return contextReviews
}
