import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Axios/useaxiosSecure";
import useAuth from "./useAuth";


const UseAdminAdd = () => {
    const axiosSecure = useAxiosSecure();
    const { user, isloading } = useAuth();
    console.log(user);
    const { data, isFetched } = useQuery(
        {
            queryKey: ['adminMeals', user.email],
            enabled: !isloading,
            queryFn: async () => {
                const result = await axiosSecure.get(`/admin/meals?email=${user?.email}`);

                return result.data;
            }
        })
    if (!isFetched) {
        return <h1>loadingg...</h1>
    }
    return [data, isFetched]


};

export default UseAdminAdd;