import useMatrixAuth from "../context/MatrixAuthContext";
import React from "react";

const SSOLoginLink = () => {
    const homeserver = useMatrixAuth().homeserverUrl;
    const redirectUrl = useMatrixAuth().ssoRedirectUrl || window.location.href;
    return <div>
        <a href={homeserver + "/_matrix/client/r0/login/sso/redirect?redirectUrl=" + redirectUrl}>Login in with SSO</a>
    </div>
}

const AuthFlowPicker = () =>{
    const matrixAuth = useMatrixAuth();
    return <div>
        {matrixAuth.authMethods?.flows.map(f => f.type).includes("m.login.password") &&
        <div>Log in with username/password (not yet supported)</div>}
        {matrixAuth.authMethods?.flows.map(f => f.type).includes("m.login.sso") &&
        <SSOLoginLink/>}
    </div>
}

export default AuthFlowPicker;