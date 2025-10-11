import { ClerkProvider } from "@clerk/clerk-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import AuthProvider from "./providers/AuthProvider";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
        throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
        <StrictMode>
                <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
                        <AuthProvider>
                                <BrowserRouter>
                                        <App />
                                </BrowserRouter>
                        </AuthProvider>
                </ClerkProvider>
        </StrictMode>
);
