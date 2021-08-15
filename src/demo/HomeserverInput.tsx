import useMatrixAuth from "../context/MatrixAuthContext";
import React from "react";

const HomeserverInput = () => {
    const matrixAuth = useMatrixAuth();
    return <div>
        <label>Homeserver:</label>
        <input type={"text"}
               value={matrixAuth.homeserverUrl}
               onChange={(e) => {
                   matrixAuth.setHomeserverUrl(e.target.value);
               }}
               onBlur={() => {
                   if (matrixAuth.homeserverUrl.length > 0) {
                       matrixAuth.loadAuthMethods();
                   }
               }}
        />
    </div>
}


export default HomeserverInput;