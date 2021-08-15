import React, {ReactNode, useContext, useState} from "react";
import {useAccessToken, useDeviceId, useHomeserverUrl, useUserId} from "../hooks/matrix-login-hooks";
import {useLocation} from "react-router-dom";
import {fetchAuthMethods, GetAuthMethodsResponse, loginWithToken} from "../api";

type LoginResponseError = {
    "errcode": string,
    "error": string
}

export interface MatrixAuthContextType {
    accessToken: string,
    deviceId: string,
    loginToken: string,
    userId: string,
    sessionName?: string,
    ssoRedirectUrl?: string,
    homeserverUrl: string,
    authMethods: GetAuthMethodsResponse,
    setHomeserverUrl: (url: string) => void,
    loadAuthMethods: () => void,
    logout: () => void,
    isLoggedIn: () => boolean,
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export const MatrixAuthContext = React.createContext<MatrixAuthContextType>({} as MatrixAuthContextType);

// Create a provider for components to consume and subscribe to changes
export const MatrixAuthProvider = ({
                                       sessionName,
                                       ssoRedirectUrl,
                                       children
                                   }:
                                       {
                                           sessionName?: string,
                                           children: ReactNode,
                                           ssoRedirectUrl?: string
                                       }
): JSX.Element => {
    let query = useQuery();
    const [loginToken, setLoginToken] = useState(query.get("loginToken") || "");
    const [authMethods, setAuthMethods] = useState<GetAuthMethodsResponse>({flows: []});
    const [homeserverUrl, setHomeserverUrl] = useHomeserverUrl();
    const [accessToken, setAccessToken] = useAccessToken();
    const [deviceId, setDeviceId] = useDeviceId();
    const [userId, setUserId] = useUserId();

    const logout = () => {
        setLoginToken("");
        setAccessToken("");
        setDeviceId("");
        setUserId("");
    }

    if (loginToken.length > 0 && homeserverUrl.length > 0 && accessToken.length === 0) {
        loginWithToken(homeserverUrl, loginToken, sessionName)
            .then(r => {
                setAccessToken(r.access_token);
                setDeviceId(r.device_id);
                setUserId(r.user_id);
            })
            .catch((e: LoginResponseError) => {
                setAccessToken("");
                setLoginToken("");
                setDeviceId("");
                setUserId("");
            });
    }

    return (
        <MatrixAuthContext.Provider value={{
            sessionName,
            homeserverUrl,
            setHomeserverUrl,
            accessToken,
            deviceId,
            userId,
            logout,
            loginToken,
            authMethods,
            ssoRedirectUrl,
            loadAuthMethods: () => {
                fetchAuthMethods(homeserverUrl)
                    .then(m => {
                        setAuthMethods(m);
                    });
            },
            isLoggedIn: () => {
                return accessToken.length > 0;
            }
        }}>
            {children}
        </MatrixAuthContext.Provider>
    );
}

export default function useMatrixAuth() {
    return useContext(MatrixAuthContext);
}
