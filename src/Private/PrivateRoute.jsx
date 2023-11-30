/* eslint-disable react/prop-types */
import { useContext } from "react";
import { authContext } from "../AuthProvider/AuthProdiver";
import { Navigate, useLocation } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";


const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user, isloading } = useContext(authContext);
    if (isloading) {
        return <div className=' min-h-screen flex justify-center items-center'>
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}
            />
        </div>
    }
    if (user) {
        return children;
    }
    <Navigate state={location.path} to='/login' replace></Navigate>
};

export default PrivateRoute;