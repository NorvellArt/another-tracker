import React, { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthApi } from '@/hooks/UseAuthApi';
import { ApiMethod } from '@/types/api';
import { User } from '@/types/user';

type ContextType = {
    currentUser: User;
    isAuthenticated: boolean;
    login(email: string, password: string): Promise<any>;
    logout(): void;
    signUp(email: string, password: string): Promise<any>;
    getCurrentUser: () => Promise<void>;
    sendAuthGuardedRequest(
        method: ApiMethod,
        path: string,
        // eslint-disable-next-line
        body?: any,
        init?: RequestInit
    ): Promise<unknown>;
};

export const AuthContext = React.createContext({} as ContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState<User>({} as User);
    const navigate = useNavigate();
    const {
        login: authLogin,
        logout: authLogout,
        getCurrentUser: authCurrentUser,
        sendAuthGuardedRequest: authSendAuthGuardedRequest,
        signUp: authSignUp,
    } = useAuthApi();

    const login = async (email: string, password: string) => {
        try {
            await authLogin(email, password);
            await getCurrentUser();
            navigate('/');
        } catch (e) {
            setIsAuthenticated(false);
            throw e;
        }
    };

    const logout = async () => {
        await authLogout();
        setIsAuthenticated(false);
        setCurrentUser({} as User);
    };

    const signUp = async (email: string, password: string) => {
        try {
            await authSignUp(email, password);
            navigate('/login');
        } catch (e: any) {
            console.log(e);
        }
    };

    const getCurrentUser = async () => {
        const user = await authCurrentUser(() => {
            setIsAuthenticated(false);
        });
        setIsAuthenticated(true);
        setCurrentUser(user);
    };

    const sendAuthGuardedRequest = async (
        method: ApiMethod,
        path: string,
        body?: any,
        init?: RequestInit
    ) => {
        return authSendAuthGuardedRequest(
            () => {
                setIsAuthenticated(false);
            },
            method,
            path,
            body,
            init
        );
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                logout,
                getCurrentUser,
                currentUser,
                sendAuthGuardedRequest,
                signUp,
            }}>
            {children}
        </AuthContext.Provider>
    );
};
