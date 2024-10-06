import PWABadge from "./PWABadge.tsx";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    {/* <Route path="/signup" element={<Signup />} /> */}
                </Routes>
            </BrowserRouter>
            <PWABadge />
        </>
    );
}

export default App;
