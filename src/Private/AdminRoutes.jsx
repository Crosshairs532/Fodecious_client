/* eslint-disable react/prop-types */

import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';
import useAuth from '../Hooks/useAuth';
import { BallTriangle } from 'react-loader-spinner';

const AdminRoutes = ({ children }) => {
    const { user, isloading } = useAuth()
    const [isAdmin, isAdminloading] = useAdmin();
    const location = useLocation();
    if (isloading || isAdminloading) {
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
    if (user && isAdmin) {
        console.log('admin route');
        return children
    }

    return <Navigate to='/login' state={location.pathname} replace></Navigate>
};


export default AdminRoutes;