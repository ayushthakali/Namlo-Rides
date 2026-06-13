import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import App from "./App";
import "./index.css";
import "./lib/leafletIcons";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Toaster position="top-center" />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
