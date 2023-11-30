/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Axios/useaxiosPublic";
import UpcomingTable from "./UpcomingTable";
import useAxiosSecure from "../../Axios/useaxiosSecure";
import { useState } from "react";


const UpcomingMeal = () => {

    const axiosSecure = useAxiosSecure();
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0)
    const { data: AllMealAdmin, isFetched: pageisFetched, refetch: pageRefetch } = useQuery({
        queryKey: ['myReviewsPagination']
        ,
        queryFn: async () => {
            const res = await axiosSecure.get(`/pagination/admin/upcoming`)
            return res.data;
        }
    })
    const { data, refetch, isFetched } = useQuery({
        queryKey: ['adminUpcoming', currentPage],
        queryFn: async () => {
            const result = await axiosSecure.get(`/admin/upcoming?page=${currentPage}&size=${itemsPerPage}`)
            console.log(result.data, "upcomingData");
            return result.data
        }
    })
    if (!isFetched || !pageisFetched) {
        return <h1>Loading......</h1>
    }
    console.log(AllMealAdmin?.count);
    const numberOfPages = Math.ceil((AllMealAdmin.count) / itemsPerPage)
    const pages = [...Array(numberOfPages).keys()];
    console.log(numberOfPages, "pages")
    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
            console.log(currentPage);
        }
    }
    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
            console.log(currentPage);
        }
    }
    return (
        <div>
            <div className=" overflow-x-auto w-screen lg:w-auto  p-2">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Meal title</th>
                            <th>Meal Category</th>
                            <th>Meal Like Count</th>
                            <th>Meal Distributor Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((item, index) =>

                                <UpcomingTable key={index} index={index} item={item}></UpcomingTable>
                            )
                        }
                    </tbody>
                </table>
                <div className=' flex items-center gap-2 justify-center pt-10'>
                    <button onClick={handlePrevPage} className="join-item btn">«</button>
                    <div>

                        {
                            pages.map(i => (
                                <button key={i} onClick={() => setCurrentPage(i)} className={`${currentPage == i ? ' bg-f-btn' : ''} btn`}>{i + 1}</button>)
                            )
                        }

                    </div>
                    <button onClick={handleNextPage} className="join-item btn">»</button>
                </div>
            </div>

        </div>
    );
};

export default UpcomingMeal;