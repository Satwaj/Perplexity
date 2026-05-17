import { createRoot } from "react-dom/client";
import "./app/index.css";
import App from "./app/App.jsx";
import { store } from "./app/app.store";
import { Provider } from "react-redux";
import { ThemeProvider } from "./app/context/ThemeContext";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>,
);
