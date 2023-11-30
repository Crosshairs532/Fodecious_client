/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Axios/useaxiosPublic";

const Requested = ({ meal, handleDelete }) => {
    const axiosPublic = useAxiosPublic();
    const { title, count, rcount, request_count, status } = meal
    const { data, isLoading, refetch: fetch, isFetched } = useQuery({
        queryKey: ['meal', title],
        queryFn: async () => {
            const res = await axiosPublic.get(`fodecious-server.vercel.app/meals?title=${title}`)
            return res?.data
        }
    })
    if (!isFetched) {
        return <h1>loading.....</h1>
    }
    console.log(data[0], title);
    return (
        <tr>
            <td><button onClick={() => handleDelete(meal._id)} className="btn btn-circle btn-outline btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button></td>
            <td>{meal?.title}</td>
            <td>{data[0]?.count}</td>
            <td>{data[0]?.rcount}</td>
            <td>{meal?.request_count}</td>
            <td>{meal?.status}</td>
        </tr>)

};

export default Requested;