/* eslint-disable no-unused-vars */
import { QueryClient, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Axios/useaxiosSecure";
import { Link } from "react-router-dom";
import { RxUpdate } from "react-icons/rx";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import UseReviewcount from "../../Hooks/UseReviewcount";
import { useEffect, useState } from "react";
import AllreviewUser from "./AllreviewUser";
import useAuth from "../../Hooks/useAuth";
const AllReview = () => {
    const { user } = useAuth();
    const [TotalReview, setTotal] = useState(0);
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 10;

    const { data, isFetched, refetch } = useQuery({
        queryKey: ['allReviewsAdmin', currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/admin/allreviews?page=${currentPage}&size=${itemsPerPage}`);
            return res.data
        }
    })
    const { data: AdminAllreview, isFetched: pageisFetched, refetch: pageRefetch } = useQuery({
        queryKey: ['AllReviewPagination', user],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pagination/admin/allReviews`)
            return res.data;
        }
    })


    if (!isFetched || !pageisFetched) {
        return <h1>loading.....</h1>
    }

    console.log(AdminAllreview?.count);
    const numberOfPages = Math.ceil((AdminAllreview.count) / itemsPerPage)
    const pages = [...Array(numberOfPages).keys()];

    // console.log(data, "alrevie");
    // console.log(TotalReview);
    const handleDelete = (meal, reload, Againfetch) => {
        console.log(meal);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/allreviews?id=${meal._id}`)
                console.log(res);
                if (res.data.deletedCount > 0) {
                    pageRefetch()
                    refetch()
                    Againfetch
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });


                }


            }
        });
    }
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
            <div className="">
                <h1>All : {data.length}</h1>
                <div>
                    <div className="overflow-x-auto w-screen lg:w-auto p-2">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead className="">
                                <tr>
                                    <th>#</th>
                                    <th>Meal Title</th>
                                    <th>Likes Count</th>
                                    <th>Reviews Count</th>
                                    <th>Action</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.map((meal, idx) =>
                                        <AllreviewUser meal={meal} key={idx} handleDelete={handleDelete}></AllreviewUser>
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

            </div>
        </div>
    );
};

export default AllReview;