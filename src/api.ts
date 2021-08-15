import cryptoRandomString from "crypto-random-string";

type LoginResponseSuccess = {
    "user_id": string,
    "access_token": string,
    "home_server": string,
    "device_id": string,
}

type IdentityProvider = {
    id: string,
    name: string,
    icon: string,
    brand: string,
}
type ClientLoginFlow = {
    type: string,
    identity_providers: IdentityProvider[] | null
}
export type GetAuthMethodsResponse = {
    flows: ClientLoginFlow[]
}
export const loginWithToken = (homeserverUrl: string, loginToken: string, sessionName?: string): Promise<LoginResponseSuccess> => {
    let nonce = cryptoRandomString({length: 10});
    return fetch(homeserverUrl + "/_matrix/client/r0/login", {
        method: "POST",
        body: JSON.stringify({
            "type": "m.login.token",
            "token": loginToken,
            "txn_id": nonce,
            "session": sessionName || "react-matrix-auth"
        })
    }).then(e => e.json());
}
export const fetchAuthMethods = (homeserverUrl: string): Promise<GetAuthMethodsResponse> => {
    return fetch(homeserverUrl + "/_matrix/client/r0/login", {
        method: "GET"
    }).then(e => e.json());
}
