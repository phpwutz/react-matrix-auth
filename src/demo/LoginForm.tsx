import useMatrixAuth  from "../context/MatrixAuthContext";
import React from "react";
import HomeserverInput from "./HomeserverInput";
import AuthFlowPicker from "./AuthFlowPicker";
import {GetAuthMethodsResponse} from "../api";

type DebugFlowsProps = {
    data: GetAuthMethodsResponse | null
}

const DebugFlows = (props: DebugFlowsProps) => {
    return !props.data
        ? <div>"No Data"</div>
        : <div>Available Flows
            <ul>
                {props.data.flows.map(f => {
                    return <li key={f.type}>{f.type}
                        {typeof f.identity_providers !== "undefined" && <div>
                            Identity Providers:
                            <ul>
                                {f.identity_providers?.map(ip => <li key={ip.id}>{ip.id} {ip.name} {ip.brand}</li>)}
                            </ul>
                        </div>
                        }
                    </li>
                })}
            </ul>
        </div>
}

const LoginForm = () => {
    const matrixAuth = useMatrixAuth();
    return <div>
        Matrix React Login
        <div>
            <HomeserverInput />
            <AuthFlowPicker />
            <DebugFlows data={matrixAuth.authMethods}/>
        </div>

    </div>
}
export default LoginForm;