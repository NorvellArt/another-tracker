import AuthClientStore from "../clientAPI/token";
import { ApiMethod } from "../types/api";
import { User } from "../types/user";
import { useApi } from "./UseApi";

let debouncedPromise: Promise<unknown> | null = null;
let debouncedResolve: (...args: unknown[]) => void;
let debouncedReject: (...args: unknown[]) => void;
let timeout: number;

export const useAuthApi = () => {
    const { sendRequest, sendProtectedRequest } = useApi();

    const login = async (email: string, password: string) => {
        const response = await sendRequest(ApiMethod.POST, 'api/auth/login', { email, password });

        AuthClientStore.setAccessToken(response.token);

        return response;
    };

    const logout = async () => {
        await sendRequest(ApiMethod.GET, 'api/auth/logout');

        AuthClientStore.removeAccessToken();
    };

    const refreshTokens = async () => {
        clearTimeout(timeout);
        if (!debouncedPromise) {
            debouncedPromise = new Promise((resolve, reject) => {
                debouncedResolve = resolve;
                debouncedReject = reject;
            });
        }

        timeout = setTimeout(() => {
            const executeLogic = async () => {
                const response = await sendRequest(
                    ApiMethod.POST,
                    'api/auth/refresh-tokens',
                    undefined,
                    undefined,
                    { credentials: "include" } // Required update
                );

                AuthClientStore.setAccessToken(response.access_token);
            };

            executeLogic().then(debouncedResolve).catch(debouncedReject);

            debouncedPromise = null;
        }, 200);

        return debouncedPromise;
    };

    const sendAuthGuardedRequest = async (
        userIsNotAuthenticatedCallback: () => void,
        method: ApiMethod,
        path: string,
        body?: any,
        init?: RequestInit
    ) => {
        try {
            return await sendProtectedRequest(method, path, body, init);
        } catch (e: any) {
            if (e?.status === 401) {
                try {
                    await refreshTokens();
                } catch (e) {
                    userIsNotAuthenticatedCallback();
                    throw e;
                }
                return await sendProtectedRequest(method, path, body, init);
            }

            throw e;
        }
    };

    const currentUser = (userIsNotAuthenticatedCallback: () => void) => {
        return sendAuthGuardedRequest(
            userIsNotAuthenticatedCallback,
            ApiMethod.GET,
            "api/auth/refresh-tokens"
        ) as Promise<User>;
    };

    return { login, logout, currentUser, sendAuthGuardedRequest };
};
