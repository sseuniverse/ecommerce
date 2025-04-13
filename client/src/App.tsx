import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
// import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import NotFound from "./pages/not-found";
import UnauthPage from "./pages/unauth-page";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { checkAuth } from "./store/auth-slice";
// import { Skeleton } from "./components/ui/skeleton";
import CheckAuth from "./components/common/check-auth";
import Loading from "./components/loading";
import ShoppingLayout from "./components/shopping-view/layout";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingListing from "./pages/shopping-view/listing";
import SearchProducts from "./pages/shopping-view/search";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import Cart from "./pages/shopping-view/cart";
import CheckOut from "./pages/shopping-view/checkout1";
import Settings from "./components/common/settings";
import MaintenancePage from "./pages/maintainence";

function App() {
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;
  // console.log(isLoading, user);
  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col overflow-hidden bg-white dark:bg-[#020618] relative">
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              {/* <AuthLayout /> */}
              <Outlet />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="checkout1" element={<CheckOut />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="maintenance" element={<MaintenancePage />} />
      </Routes>
      <Settings />
    </div>
  );
}

export default App;
