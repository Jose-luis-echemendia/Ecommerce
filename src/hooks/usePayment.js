import { useContext } from 'react'
import { PaymentContext } from '../context/paymentContext'


export const usePayment = () => {
    const contextPayment = useContext(PaymentContext)

    if (contextPayment === undefined) {
        throw new Error('usePayment must be used wihin a PaymentProvider')
    }

    return contextPayment
}
