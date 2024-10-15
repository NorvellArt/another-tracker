import PWABadge from "@/PWABadge.tsx";
import { Route, Routes } from "react-router-dom";
import Login from "@/pages/Login.tsx";
import { AuthContext } from "@/provider/AuthProvider.tsx";
import React, { useEffect } from "react";
import Home from "@/pages/Home.tsx";
import PublicLayout from "@/layout/PublicLayout.tsx";
import ProtectedLayout from "@/layout/ProtectedLayout.tsx";
import Profile from "@/pages/Profile.tsx";
import Settings from "@/pages/Settings.tsx";

function App() {
    const { currentUser } = React.useContext(AuthContext);

    useEffect(() => {
        currentUser().catch(() => {});
    }, []);

    return (
        <>
            <Routes>
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                </Route>

                <Route path="/dashboard" element={<ProtectedLayout />}>
                    <Route path="profile" element={<Profile />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
            <PWABadge />
        </>
    );
}

export default App;
