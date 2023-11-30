/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosPublic from "../../Axios/useaxiosPublic";
import { useContext, useState } from "react";
import { authContext } from "../../AuthProvider/AuthProdiver";
import { Rating } from "@mui/material";
import Swal from "sweetalert2";
import EachMeal from "./EachMeal";
import useAxiosSecure from "../../Axios/useaxiosSecure";


const My_reviews = () => {
    // const [value, setValue] = useState(0);
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 10;
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const { user, isloading } = useContext(authContext)

    const { data: allRequested_user, isFetched: pageisFetched, refetch: pageRefetch } = useQuery({
        queryKey: ['myReviewsPagination', user]
        ,
        queryFn: async () => {
            const res = await axiosSecure.get(`/pagination/my_reviews_user?email=${user?.email}`)
            return res.data;
        }
    })
    console.log(allRequested_user);
    const { data, isFetched, refetch } = useQuery({
        queryKey: ['myreview', user, currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allreviews?email=${user?.email}&page=${currentPage}&size=${itemsPerPage}`)
            return res.data;
        }
    })

    if (!isFetched || !pageisFetched) {
        return <h1> loading....</h1>
    }
    console.log(allRequested_user?.count);
    const numberOfPages = Math.ceil((allRequested_user.count) / itemsPerPage)
    const pages = [...Array(numberOfPages).keys()];
    console.log(numberOfPages, "pages")
    const handleDelete = (id, againfetch) => {
        console.log(id);
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
                const res = await axiosPublic.delete(`/allreviews?id=${id}`)
                console.log(res);
                if (res.data.deletedCount > 0) {
                    refetch();
                    againfetch
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
            <h1>reviews :{data.length}</h1>
            <div className="overflow-x-auto rounded-md w-screen max-h-[calc(100vh-100px)] overflow-y-auto">
                <table className="table table-zebra  ">
                    {/* head */}
                    <thead className=" sticky top-0 border-2 backdrop-blur-sm bg-[#d7d7d7a7]  z-10">
                        <tr className=" text-black text-lg rounded-md font-bold">
                            <th>#</th>
                            <th>meal title</th>
                            <th>Like Counts</th>
                            <th>Review Counts</th>
                            <th>Edit Review</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((meal, idx) =>
                                <EachMeal key={idx} meal={meal} handleDelete={handleDelete}></EachMeal>)
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

export default My_reviews;
