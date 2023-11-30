import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Axios/useaxiosSecure";
import { FaTrash, FaUser, FaUsers } from "react-icons/fa6";
import Swal from "sweetalert2";
import { RxUpdate } from "react-icons/rx";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
const Allmeal = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 10;

    const { data: allmeals = [], refetch, isFetched } = useQuery({
        queryKey: ['allmeals', currentPage, user],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/allmeals?page=${currentPage}&size=${itemsPerPage}`)
            return res.data

        }
    })

    const { data: AdminAllmeal, isFetched: pageisFetched, refetch: pageRefetch } = useQuery({
        queryKey: ['myAllmealPagination', user]
        ,
        queryFn: async () => {
            const res = await axiosSecure.get(`/pagination/AdminAllmeal`)
            return res.data;
        }
    })
    console.log(AdminAllmeal);
    if (!pageisFetched || !isFetched) {
        return <h1>loading.....</h1>
    }

    console.log(allmeals, "allmeals");
    console.log(AdminAllmeal?.count);
    const numberOfPages = Math.ceil((AdminAllmeal.count) / itemsPerPage)
    const pages = [...Array(numberOfPages).keys()];
    console.log(numberOfPages, "pages")
    const handleDelete = (meal) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/meals?id=${meal._id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: `${meal.title} deleted`,
                                icon: "success"
                            });
                        }
                        refetch()
                    })
            }
        });
    }
    // const handleUpdate = (meal) => {

    //     console.log(meal._id);
    //     axiosSecure.patch(`/meals?id=${meal._id}`, meal)
    //         .then(res => {
    //             console.log(res.data)
    //             if (res.data.modifiedCount > 0) {
    //                 Swal.fire({
    //                     position: "top-end",
    //                     icon: "success",
    //                     title: `${meal.title.name} is updated`,
    //                     showConfirmButton: false,
    //                     timer: 1500
    //                 });

    //             }
    //             refetch()
    //         })
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
        <div className="">
            <h1>All : {allmeals.length}</h1>
            <div>
                <div className="overflow-x-auto w-[90%] mx-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead className="">
                            <tr>
                                <th></th>
                                <th>Meal Title</th>
                                <th>Likes Count</th>
                                <th>Reviews Count</th>
                                <th>Distributor Name and email</th>
                                <th>Action</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allmeals?.map((meal, idx) =>

                                    <tr key={idx}>
                                        <th>
                                            <Link to={`/dashboard/update/${meal.title}`}>  <button className=" btn text-success bg-f-footer">
                                                < RxUpdate size={20}></RxUpdate>
                                            </button></Link>
                                        </th>
                                        <td>{meal.title}</td>
                                        <td>{meal.count}</td>
                                        <td>
                                            {meal.rcount >= 0 ? meal.rcount : 'not given'}
                                        </td>
                                        <td className=" flex flex-col">
                                            <p className=" font-Nunito font-bold text-lg"> {meal.distributorName}</p>
                                            <p className=" font-play-serif text-sm">{meal.distributorEmail}</p>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(meal)} className=" btn bg-f-bg text-f-error text-white">
                                                <FaTrash></FaTrash>
                                            </button>
                                        </td>
                                        <td>
                                            <Link to={`/detail/${meal._id}`}><button className=" btn bg-f-title text-f-icon font-Nunito">Details</button></Link>
                                        </td>
                                    </tr>

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
    );
};

export default Allmeal;