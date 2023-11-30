import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Axios/useaxiosSecure";
import useAuth from '../Hooks/useAuth';

const useAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const { user, isloading } = useAuth();
    const { data: isAdmin, isLoading: isAdminloading, isFetched } = useQuery({
        queryKey: ['admin'],
        enabled: !isloading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/admin?email=${user?.email}`);
            console.log(res.data.isAdmin, "admin");
            return res.data?.isAdmin;
        }
    })
    // if (!isFetched) {
    //     return <h1>loading......</h1>
    // }
    console.log(isAdmin, "useAdmin");
    return [isAdmin, isAdminloading]
};

export default useAdmin;