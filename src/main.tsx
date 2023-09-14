import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
// import HorizantalScroll from "./components/HorizantalScroll/HorizantalScroll";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
    {/* <div className="mx-auto container" style={{ direction: "ltr" }}>
        <HorizantalScroll />
      </div> */}
  </Provider>
  // </React.StrictMode>
);
