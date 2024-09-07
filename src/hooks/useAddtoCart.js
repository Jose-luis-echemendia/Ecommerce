import { useCart } from "./useCart";
import { useNavigate } from "react-router-dom";

export const useAddtoCart = (product, setLoading, selectedColor, selectedSizes) => {


    const navigate = useNavigate();
    const { addItemTocART, getItems, getTotal, getItemTotal } = useCart();


    const handleAddtoCart = async () => {
        if (
            product &&
            product !== null &&
            product !== undefined &&
            product.quantity > 0
        ) {
            setLoading(true)
            const res = await addItemTocART(product, selectedColor, selectedSizes);
            await getItems(product);
            await getTotal(product);
            await getItemTotal(product);
            setLoading(false)
            if (res === true) return navigate("/cart");
            if (res === "this item is already in cart") return "this item is already in cart"
        }
        
    };
    return { handleAddtoCart }
}
