import { Route, Routes } from "react-router-dom";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import HomePage from "./pages/home/HomePage";

export default function App() {
        return (
                <>
                        <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/auth-callback" element={<AuthCallbackPage />} />
                        </Routes>
                </>
        );
}
