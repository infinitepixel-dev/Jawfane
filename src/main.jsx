//main.jsx

//INFO React Libraries
import ReactDOM from "react-dom/client";

//INFO Parent App Component
import App from "./App.jsx";

//INFO Custom CSS
import "./index.css";

//ANCHOR Import AuthProvider for Login and Logout
import AuthProvider from "@contexts_product_management/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>
  // </React.StrictMode>,
);
