import React from "react";
import ReactDOM from "react-dom/client";
import AppWrapper from "./App"; // use AppWrapper, not App
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AppWrapper />
  </AuthProvider>
);
