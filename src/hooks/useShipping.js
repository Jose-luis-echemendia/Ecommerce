import { useContext } from 'react'
import { ShipingContext } from '../context/shippingContext'


export const useShipping = () => {
    const contextShipping = useContext(ShipingContext)

    if (contextShipping === undefined) {
        throw new Error('useShipping must be used wihin a ShippingProvider')
    }

    return contextShipping
}
