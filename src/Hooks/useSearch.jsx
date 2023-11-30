import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Axios/useaxiosSecure";
const useSearch = (name, email, currentPage, itemsPerPage) => {
    console.log(name, email, currentPage, itemsPerPage);
    const axiosSecure = useAxiosSecure();
    const { data, isFetched, refetch } = useQuery({
        queryKey: ['search', name, email, currentPage, itemsPerPage],
        queryFn: async () => {
            const Search = await axiosSecure.get(`/admin/allrequest?email=${email}&name=${name}`)
            console.log(Search.data);
            return Search?.data;
        }
    })
    if (!isFetched || data) {
        return <h1>loading.....</h1>
    }
    console.log([data, isFetched, refetch]);
    return [data, isFetched, refetch]
};
export default useSearch;
// &page=${currentPage}&size=${itemsPerPage}