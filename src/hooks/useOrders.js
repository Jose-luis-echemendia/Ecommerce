import { useContext } from 'react'
import { OrdersContext } from '../context/ordersContext'


export const useOrders = () => {
    const contextOrders = useContext(OrdersContext)

    if (contextOrders === undefined) {
        throw new Error('useOrders must be used wihin a OrdersProvider')
    }

    return contextOrders
}
