import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Axios/useaxiosSecure";
import { FaTrash, FaUser, FaUsers } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";

const ManageUser = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 10;
    const { data: users = [], refetch, isFetched } = useQuery({
        queryKey: ['users', currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin_user?page=${currentPage}&size=${itemsPerPage}`)
            return res.data
        }
    })

    const { data: Admin_user, isFetched: pageisFetched, refetch: pageRefetch } = useQuery({
        queryKey: ['AllusersPagination', user],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pagination/admin/Allusers`)
            return res.data;
        }
    })

    if (!pageisFetched || !isFetched) {
        return <h1>loading.....</h1>
    }
    console.log(Admin_user?.count);
    const numberOfPages = Math.ceil((Admin_user.count) / itemsPerPage)
    const pages = [...Array(numberOfPages).keys()];
    // console.log(numberOfPages, "pages")
    // console.log(users, "alluser");
    const handleDelete = (user) => {
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
                axiosSecure.delete(`/user/admin?email=${user.email}&username=${user.name}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                        refetch()
                        pageRefetch()
                    })
            }
        });
    }
    const handleMakeadmin = (user) => {
        console.log(user._id);
        axiosSecure.patch(`/user/admin?email=${user.email}&username=${user.name}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} now is an admin`,
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
                refetch()
            })
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
        <div className="">
            <h1>All : {users.length}</h1>
            <div>
                <div className="overflow-x-auto w-[90%] mx-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead className="">
                            <tr>
                                <th></th>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>Role</th>
                                <th>Subscription Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, idx) =>
                                    <tr key={idx}>
                                        <th>{idx + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                                user.role == 'admin' ? 'admin' : <button onClick={() => handleMakeadmin(user)} className=" btn bg-yellow-700 text-white"><FaUsers></FaUsers></button>
                                            }
                                        </td>
                                        <td>{user.badge}</td>
                                        <td>
                                            <button onClick={() => handleDelete(user)} className=" btn bg-red-700 text-white">
                                                <FaTrash></FaTrash>
                                            </button>
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

export default ManageUser;