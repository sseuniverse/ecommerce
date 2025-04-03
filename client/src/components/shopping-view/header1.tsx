import { Link, useSearchParams } from "react-router-dom";
import { shoppingViewHeaderMenuItems, shoppingAccountHeader } from "@/config";
import React from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useRoutes } from "@/hooks/useRoutes";
import { logoutUser } from "@/store/auth-slice";
import "../../css/header.css";

interface MenuLinks {
  id: string;
  label: string;
  path: string;
}

function MenuItems() {
  const { navigator, location } = useRoutes();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem: MenuLinks) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigator(getCurrentMenuItem.path);
  }

  return (
    <ul className="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <li className={menuItem.id !== "home" ? "shrink-0" : ""}>
          <label
            onClick={() => handleNavigate(menuItem)}
            className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
            key={menuItem.id}
          >
            {menuItem.label}
          </label>
        </li>
      ))}
    </ul>
  );
}

function HeaderRightContent() {
  const { user } = useAppSelector((state) => state.auth);
  const { cartItems } = useAppSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = React.useState(false);
  const dispatch = useAppDispatch();
  const { navigator } = useRoutes();

  function handleLogout() {
    dispatch(logoutUser());
  }

  const cartItemsNo =
    cartItems?.items.reduce((total, item) => total + item.quantity, 0) || 0;

  React.useEffect(() => {
    dispatch(fetchCartItems(user?.id!));
  }, [dispatch]);

  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("myCartDropdownButton1")?.click();
  });

  return (
    <div className="flex items-center lg:space-x-2">
      <Link
        to="/shop/cart"
        type="button"
        className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white"
      >
        {/* <span className="sr-only">Cart</span> */}
        <svg
          className="w-5 h-5 lg:me-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
          />
        </svg>
        <span className="hidden sm:flex">My Cart</span>
        <div className="absolute inline-flex items-center justify-center w-[1rem] h-[1rem] font-medium text-[.75rem]/[1rem] sse-colors rounded-[9999px] top-[-.375rem] -end-1.5">
          {cartItemsNo}
        </div>
      </Link>

      <button
        id="userDropdownButton1"
        data-dropdown-toggle="userDropdown1"
        type="button"
        className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white"
      >
        <svg
          className="w-5 h-5 me-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-width="2"
            d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        Account
        <svg
          className="w-4 h-4 text-gray-900 dark:text-white ms-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 9-7 7-7-7"
          />
        </svg>
      </button>

      <div
        id="userDropdown1"
        className="hidden z-10 w-56 divide-y divide-gray-100 overflow-hidden overflow-y-auto rounded-lg bg-white antialiased shadow dark:divide-gray-600 dark:bg-gray-700"
      >
        <ul className="p-2 text-start text-sm font-medium text-gray-900 dark:text-white">
          {shoppingAccountHeader.map((menuItem) => (
            <li>
              <Link
                to={menuItem.path}
                className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                key={menuItem.id}
              >
                {menuItem.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="shrink-0">
      <Link to="/" title="" className="">
        <img
          className="block w-auto h-8 dark:hidden"
          src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/logo-full.svg"
          alt=""
        />
        <img
          className="hidden w-auto h-8 dark:block"
          src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/logo-full-dark.svg"
          alt=""
        />
      </Link>
    </div>
  );
}

export default function ShoppingHeader() {
  return (
    <nav className="bg-white dark:bg-gray-800 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Logo />
            <MenuItems />
          </div>

          <HeaderRightContent />
        </div>
      </div>
    </nav>
  );
}
