import React, { useEffect } from 'react';
import PWABadge from '@/PWABadge.tsx';
import { Route, Routes } from 'react-router-dom';
import Login from '@/pages/Credentials/Login';
import { AuthContext } from '@/provider/AuthProvider.tsx';
import Start from '@/pages/Credentials/Start';
import PublicLayout from '@/layout/PublicLayout.tsx';
import ProtectedLayout from '@/layout/ProtectedLayout.tsx';
import Profile from '@/pages/Profile.tsx';
import Projects from '@/pages/Projects.tsx';
import SignUp from '@/pages/Credentials/SignUp';

function App() {
    const { getCurrentUser } = React.useContext(AuthContext);

    useEffect(() => {
        getCurrentUser().catch(() => {});
    }, []);

    return (
        <>
            <Routes>
                <Route element={<PublicLayout />}>
                    <Route path='/' element={<Start />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />
                </Route>

                <Route path='/app' element={<ProtectedLayout />}>
                    <Route path='profile' element={<Profile />} />
                    <Route path='projects' element={<Projects />} />
                </Route>
            </Routes>
            <PWABadge />
        </>
    );
}

export default App;
