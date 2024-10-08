import { AuthClientStore } from "../clientAPI/Token";
import { ApiMethod } from "../types/api";

const apiUrl = "http://api:80/";

const sendRequest = (
    method: ApiMethod,
    path: string,
    body?: any,
    authToken?: string | null,
    init?: RequestInit
) => {
    return fetch(apiUrl + path, {
        method,
        ...(body && { body: JSON.stringify(body) }),
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...(authToken && { Authorization: `Bearer ${authToken}` }),
            ...init?.headers,
        },
    }).then((response) => {
        if (response.status >= 400) {
            throw response;
        }
        
        return response.json();
    });
};

const sendProtectedRequest = (method: ApiMethod, path: string, body?: any, init?: RequestInit) => {
    const authToken = AuthClientStore.getAccessToken();
    if (!authToken) {
        throw new Error("No auth token found");
    }

    return sendRequest(method, path, body, authToken, init);
};

export const useApi = () => {
    return { sendRequest, sendProtectedRequest };
};
