
# ATTENTION This is work in progress. Use at your own peril. Interfaces might break without announcements up to version 1

# Public API:

react-router-dom is currently required to read the loginToken parameter for single sign on.

In your index.js, add the MatrixAuthProvider around your App.
```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createBrowserHistory} from "history";
import {Router} from "react-router-dom";
import {MatrixAuthProvider} from "./context/MatrixAuthContext";

const history = createBrowserHistory();
ReactDOM.render(
    <React.StrictMode>
        <Router history={history}>
            <MatrixAuthProvider sessionName={"your-matrix-client-session-name"} ssoRedirectUrl={"https://custom/redirect/URL"}>
                <App/>
            </MatrixAuthProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
```

You can then use the `useMatrixAuth()` hook 
```tsx
const MyComponent = () =>{
    const matrix = useMatrixAuth();
    return <div>{matrix.isLoggedIn() ? "Logged In" : "Not logged in"}</div>
}
```

Check the `MatrixAuthContextType` interface for all available properties and methods.

```tsx
// this might be outdated, please check the source interface for 100% up to date definitions
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
```