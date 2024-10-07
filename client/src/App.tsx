import PWABadge from "./PWABadge.tsx";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Login from "./pages/Login.tsx";
import { AuthContext } from "../provider/AuthProvider.tsx";
import React, { useEffect, useState } from "react";

function App() {
    const { isAuthenticated, currentUser } = React.useContext(AuthContext);
    const [appIsLoading, setAppIsLoading] = useState(true);

    useEffect(() => {
        currentUser()
            .catch(() => {})
            .finally(() => setAppIsLoading(false));
    }, []);

    if (appIsLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Login />;
    }

    return (
        <>
            <BrowserRouter>
                <div>Yoyoyoyoyoyoyoy</div>
            </BrowserRouter>
            <PWABadge />
        </>
    );
}

export default App;
