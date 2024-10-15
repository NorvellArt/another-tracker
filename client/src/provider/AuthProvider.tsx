import React, { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthApi } from "@/hooks/UseAuthApi";
import { ApiMethod } from "@/types/api";
import { User } from "@/types/user";

type ContextType = {
    isAuthenticated: boolean;
    login(email: string, password: string): Promise<any>;
    logout(): void;
    currentUser(): Promise<User>;
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
    const navigate = useNavigate();
    const {
        login: authLogin,
        logout: authLogout,
        currentUser: authCurrentUser,
        sendAuthGuardedRequest: authSendAuthGuardedRequest,
    } = useAuthApi();

    const login = async (email: string, password: string) => {
        try {
            await authLogin(email, password);
            
            setIsAuthenticated(true);
            navigate('/');
        } catch (e) {
            setIsAuthenticated(false);
            throw e;
        }
    };

    const logout = async () => {
        await authLogout();
        setIsAuthenticated(false);
    };

    const currentUser = async () => {
        const user = await authCurrentUser(() => {
            setIsAuthenticated(false);
        });
        setIsAuthenticated(true);
        return user;
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
            value={{ isAuthenticated, login, logout, currentUser, sendAuthGuardedRequest }}>
            {children}
        </AuthContext.Provider>
    );
};
