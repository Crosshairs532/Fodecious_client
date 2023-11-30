import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

// import { CiGlass } from "react-icons/ci";
const axiosSecure = axios.create({
    baseURL: 'https://fodecious-server.vercel.app'
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    axiosSecure.interceptors.request.use(function (config) {
        // console.log('im being used');
        const token = localStorage.getItem('access-token')
        // console.log(token, "secure");
        config.headers.authorization = `Bearer ${token}`;
        // console.log(config.headers.authorization, "token set kora hoise");
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        console.log(error.message, error.response.status, "axois Secure error");
        const status = error.response.status;
        if (status === 401 || status === 403) {
            await logout();
            // console.log('what is this')
            navigate('/login');
        }
        return Promise.reject(error);
    })
    return axiosSecure;
};

export default useAxiosSecure;