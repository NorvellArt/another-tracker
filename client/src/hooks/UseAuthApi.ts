import { AuthClientStore } from '@/clientAPI/Token';
import { ApiMethod } from '@/types/api';
import { User } from '@/types/user';
import { useApi } from '@/hooks/UseApi';

let debouncedPromise: Promise<unknown> | null = null;
let debouncedResolve: (...args: unknown[]) => void;
let debouncedReject: (...args: unknown[]) => void;
let timeout: number;

export const useAuthApi = () => {
    const { sendRequest, sendProtectedRequest } = useApi();

    const login = async (email: string, password: string): Promise<User> => {
        const response = await sendRequest(
            ApiMethod.POST,
            '/auth/login',
            { email, password },
            undefined,
            { credentials: 'include' }
        );

        AuthClientStore.setAccessToken(response.token);
        return response;
    };

    const logout = async () => {
        await sendProtectedRequest(ApiMethod.GET, '/auth/logout', undefined, {
            credentials: 'include',
        });

        AuthClientStore.removeAccessToken();
    };

    const signUp = async (email: string, password: string) => {
        await sendRequest(
            ApiMethod.POST,
            '/auth/register',
            { email, password },
            undefined
        );
    };

    const refreshTokens = async () => {
        clearTimeout(timeout);
        if (!debouncedPromise) {
            debouncedPromise = new Promise((resolve, reject) => {
                debouncedResolve = resolve;
                debouncedReject = reject;
            });
        }

        timeout = window.setTimeout(() => {
            const executeLogic = async () => {
                const response = await sendRequest(
                    ApiMethod.GET,
                    '/auth/refresh-tokens',
                    undefined,
                    undefined,
                    { credentials: 'include' } // Required update
                );

                AuthClientStore.setAccessToken(response.token);
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

    const getCurrentUser = async (userIsNotAuthenticatedCallback: () => void) => {
        return (await sendAuthGuardedRequest(
            userIsNotAuthenticatedCallback,
            ApiMethod.GET,
            '/auth/currentUser'
        )) as Promise<User>;
    };

    return { login, logout, getCurrentUser, sendAuthGuardedRequest, signUp };
};
