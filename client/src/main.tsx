import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';

import { AuthProvider } from '@/provider/AuthProvider';
import { BrowserRouter } from 'react-router-dom';

import '@/main.css';
import '@fontsource/ibm-plex-sans';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
