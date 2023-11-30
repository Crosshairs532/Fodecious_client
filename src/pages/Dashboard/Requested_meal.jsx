/* eslint-disable no-unused-vars */
import TablePagination from '@mui/material/TablePagination';
import { useContext, useState } from "react";
import useAxiosPublic from "../../Axios/useaxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Rating } from "@mui/material";
import { authContext } from "../../AuthProvider/AuthProdiver";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import loading from '../../assets/loading.json'
import Pagination from '@mui/material/Pagination';
import Lottie from "lottie-react";
import useAxiosSecure from "../../Axios/useaxiosSecure";
import Requested from "./Requested";
const Requested_meal = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 10;
    const { user, isloading } = useContext(authContext)
    const { data: allRequested_user, isFetched: pageisFetched, refetch: pageRefetch } = useQuery({
        queryKey: ['myrequestPagination', user]
        ,
        queryFn: async () => {
            const res = await axiosSecure.get(`/pagination/request_user?email=${user?.email}`)
            return res.data;
        }
    })
    const { data, isFetched, refetch } = useQuery({
        queryKey: ['myrequest', user, currentPage]
        ,
        queryFn: async () => {
            const res = await axiosSecure.get(`/allRequest?email=${user?.email}&page=${currentPage}&size=${itemsPerPage}&sort=status`)
            return res.data;
        }
    })
    if (!isFetched || !pageisFetched) {
        return <div className="  h-[70vh] flex justify-center items-center">
            <Lottie animationData={loading} loop={true}></Lottie>
        </div>
    }


    console.log(allRequested_user?.count);
    const numberOfPages = Math.ceil((allRequested_user.count) / itemsPerPage)
    const pages = [...Array(numberOfPages).keys()];
    console.log(numberOfPages)
    const handleDelete = (id) => {
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
                const res = await axiosPublic.delete(`/allRequest?id=${id}`)
                console.log(res);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            }
        });
    }
    // const handleItemsPerPage = e => {
    //     // const val = parseInt(e.target.value)
    //     // setItemsPerPage(val)
    //     setCurrentPage(0)
    // }
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
            <div className="overflow-x-auto rounded-md  max-h-[calc(100vh-100px)] overflow-y-auto">
                <table className="table table-zebra  ">
                    {/* head */}
                    <thead className=" sticky top-0 border-2 backdrop-blur-sm bg-[#d7d7d7a7]  z-10">
                        <tr className=" text-black text-lg rounded-md font-bold">
                            <th>#</th>
                            <th>meal title</th>
                            <th>Like Counts</th>
                            <th>Review Counts</th>
                            <th>Requested by You</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((meal, idx) =>
                                <Requested meal={meal} handleDelete={handleDelete} key={idx}></Requested>)
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

            </div >

        </div >
    );
};

export default Requested_meal;






