import { useContext } from 'react'
import { CouponContext } from '../context/couponContext'


export const useCoupon = () => {
    const contextCoupon = useContext(CouponContext)

    if (contextCoupon === undefined) {
        throw new Error('useCoupon must be used wihin a CouponProvider')
    }

    return contextCoupon
}
