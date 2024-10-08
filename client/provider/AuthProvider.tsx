import React from "react";
import { useAuthApi } from "../hooks/UseAuthApi";
import { ApiMethod } from "../types/api";
import { ReactNode, useState } from "react";
import { User } from "../types/user";
import { useNavigate } from "react-router-dom";

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
            const token = await authLogin(email, password);
            
            setIsAuthenticated(true);
            return token;
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
            setIsAuthenticated(() => false);
        });
        setIsAuthenticated(true);
        navigate('/home');
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
