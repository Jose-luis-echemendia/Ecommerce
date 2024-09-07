import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//PAGES
import { Home } from "../containers/page/Home";
import { Store } from "../containers/page/Store";
import { Error404 } from "../containers/errors/Error404";
import { DetailProduct } from "../containers/page/DetailProduct";
import { Cart } from "../containers/page/Cart";
import { Checkout } from "../containers/page/Checkout";
import { Search } from "../containers/page/Search";

//AUTHENTICATION
import { Activate } from "../containers/auth/Activate";
import { Signup } from "../containers/auth/Signup";
import { Login } from "../containers/auth/Login";
import { ResetPassword } from "../containers/auth/resetPassword";
import { ResetPasswordConfirm } from "../containers/auth/ResetPasswordConfirm";

//ADMIN
import { UserInformation } from "../containers/Admin/UserInformation";
import { ListOrders } from "../containers/Admin/ListOrders";
import { DetailsOrder } from "../containers/Admin/DetailsOrder";
import { HistoryPayment } from "../containers/Admin/HistoryPayment";
import { DetailsHistoryPayment } from "../containers/Admin/DetailsHistoryPayment";
import { Profile } from "../containers/Admin/Profile";
import { ViewDollar } from "../containers/Admin/ViewDollar";

import { ProtectedRoute } from "../hocs/ProtectedRoute";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useEffect, useState } from "react";
import { ThankYou } from "../containers/page/ThankYou";

//CONTEXT PROVIDER LOCALES
import { CouponProvider } from "../context/couponContext";
import { FiltersOrdersProvider } from "../context/filtersOrdersContext";
import { ProfileProvider } from "../context/profileContext";
import { ProductsInWishlist } from "../containers/Admin/ProductsInWishlist";

export const Routers = () => {
  const { stateAuth, checkAuthenticated, refresh, loaderUser } = useAuth();
  const { getItemTotal } = useCart();
  const [loading, setLoading] = useState(false);

  const getStateAuth = async () => {
    setLoading(true);
    try {
      await checkAuthenticated();
      await refresh();
      await loaderUser();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getStateAuth();
    getItemTotal();
  }, [stateAuth.isAuthenticated]);

  return (
    <>
      <Router>
        <Routes>
          {/* ERROR DISPLAY */}
          <Route path="*" element={<Error404 />}></Route>

          {/* HOME DISPLAY */}
          <Route path="/" element={<Home />}></Route>
          <Route path="/shopping" element={<Store />}></Route>
          <Route path="/cart" element={<Cart />}></Route>

          <Route
            element={
              <ProtectedRoute
                redirectTo="/login/"
                isAllowed={!!stateAuth.user && stateAuth.isAuthenticated}
              />
            }
          >
            <Route
              path="/checkout"
              element={
                <CouponProvider>
                  <Checkout />
                </CouponProvider>
              }
            ></Route>
            <Route path="/thanks" element={<ThankYou />}></Route>
          </Route>

          <Route
            element={
              <FiltersOrdersProvider>
                <ProtectedRoute
                  isAllowed={
                    !!stateAuth.user &&
                    stateAuth.isAuthenticated &&
                    stateAuth.user.permissions &&
                    stateAuth.user.permissions.includes("gestionAdmin")
                  }
                />
              </FiltersOrdersProvider>
            }
          >
            <Route
              path="/Dashboard-User/Information"
              element={<UserInformation />}
            ></Route>
            <Route
              path="/Dashboard-User/ListOrders"
              element={<ListOrders />}
            ></Route>
            <Route
              path="/Dashboard-User/DetailsOrder/:orderId"
              element={<DetailsOrder />}
            ></Route>
            <Route
              path="/Dashboard-User/DetailsHistoryPayment/:orderHistoryId"
              element={<DetailsHistoryPayment />}
            ></Route>
            <Route
              path="/Dashboard-User/HistoryPayment"
              element={<HistoryPayment />}
            ></Route>
            <Route
              path="/Dashboard-User/FavoriteProducts"
              element={<ProductsInWishlist />}
            ></Route>
            <Route
              path="/Dashboard-User/Profile"
              element={
                <ProfileProvider>
                  <Profile />
                </ProfileProvider>
              }
            ></Route>
            <Route
              path="/Dashboard-User/ViewDollar"
              element={<ViewDollar />}
            ></Route>
          </Route>

          <Route path="/product/:productId" element={<DetailProduct />}></Route>
          <Route path="/search" element={<Search />}></Route>

          {/* AUTHENTICATION */}
          <Route path="/activate/:uid/:token" element={<Activate />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/resetPassword" element={<ResetPassword />}></Route>
          <Route
            path="/resetPassword/Confirm/:uid/:token"
            element={<ResetPasswordConfirm />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
};
