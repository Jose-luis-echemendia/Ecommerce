//CONTEXT PROVIDER
import { AuthProvider } from "../context/authContext";
import { AlertProvider } from "../context/alertContext";
import { CartProvider } from "../context/cartContext";
import { CategoryProvider } from "../context/categoryContext";
import { ColorsProvider } from "../context/colorContext";
import { SizesProvider } from "../context/sizeContext";
import { ProductProvider } from "../context/productContext";
import { FiltersProvider } from "../context/filtersContext";
import { ShippingProvider } from "../context/shippingContext";
import { OrdersProvider } from "../context/ordersContext";
import { PaymentProvider } from "../context/paymentContext";
import { WishlistProvider } from "../context/wishlistContext";
import { ReviewsProvider } from "../context/reviewsContext";

export const ContextProviders = ({ children }) => {
  return (
    <>
      <AlertProvider>
        <AuthProvider>
          <CartProvider>
            <PaymentProvider>
              <OrdersProvider>
                <ShippingProvider>
                  <CategoryProvider>
                    <ColorsProvider>
                      <SizesProvider>
                        <WishlistProvider>
                          <ProductProvider>
                            <ReviewsProvider>
                              <FiltersProvider>{children}</FiltersProvider>
                            </ReviewsProvider>
                          </ProductProvider>
                        </WishlistProvider>
                      </SizesProvider>
                    </ColorsProvider>
                  </CategoryProvider>
                </ShippingProvider>
              </OrdersProvider>
            </PaymentProvider>
          </CartProvider>
        </AuthProvider>
      </AlertProvider>
    </>
  );
};
