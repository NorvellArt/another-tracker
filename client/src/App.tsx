import PWABadge from "./PWABadge.tsx";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import { AuthContext } from "../provider/AuthProvider.tsx";
import React, { useEffect } from "react";
import { RequireAuth } from "./components/RequireAuth.tsx";
import Home from "./pages/Home.tsx";

function App() {
    const { currentUser } = React.useContext(AuthContext);

    useEffect(() => {
        currentUser().catch(() => {});
    }, []);

    return (
        <>
            <Routes>
                <Route element={<RequireAuth />}>
                    <Route path="/home" element={<Home />} />
                </Route>

                <Route path="/login" element={<Login />} />
            </Routes>
            <PWABadge />
        </>
    );
}

export default App;
