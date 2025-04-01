// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { Toaster } from "@/components/ui/toaster.tsx";
// import { SettingsProvider } from "./context/theme.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    {/* <SettingsProvider> */}
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
    {/* </SettingsProvider> */}
  </BrowserRouter>
);
