import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../Axios/useaxiosPublic';

const useReview = () => {
    const axiosPublic = useAxiosPublic();
    const { data: review = [], isLoading: rLoading, refetch, isFetched } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/allreviews`)
            console.log(res.data);
            return res?.data
        }
    })
    console.log(review, "kire vai");
    if (!isFetched) {
        return <h1>loading....</h1>
    }
    return { review, refetch }
};

export default useReview;