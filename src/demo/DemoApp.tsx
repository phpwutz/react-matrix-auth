import useMatrixAuth from "../context/MatrixAuthContext";
import React, {ComponentProps, Fragment} from "react";
import LoginForm from "./LoginForm";

const RequireLogin = (props: ComponentProps<any>) => {
    const matrix = useMatrixAuth();

    if (matrix.accessToken.length > 0) {
        return <Fragment>{props.children}</Fragment>
    }
    return <div>
        Got No access token. Please log in
    </div>
}

const LogoutButton = () => {
    const matrix = useMatrixAuth();
    return <button onClick={() => {
        matrix.logout();
    }}>Log out
    </button>
}

function App() {
    const matrix = useMatrixAuth();
    return (
        <Fragment>
            <LoginForm/>
            <RequireLogin>
                <div>
                    <h3>Yea looks like you are logged in</h3>
                    accessToken: {matrix.accessToken}<br/>
                    <LogoutButton/>
                </div>
            </RequireLogin>
        </Fragment>
    );
}

export default App;
