import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from '../Axios/useaxiosSecure';
const useLikecheck = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: likedMeal = [] } = useQuery({
        queryKey: ['likeChecking', user?.email],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/likedMeals?email=${user?.email}`)
                return res.data
            }
            catch (error) {
                console.log(error);
            }
        }
    })
    return likedMeal
};

export default useLikecheck;