/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Axios/useaxiosSecure";
import AdminEachRequest from "./AdminEachRequest";
import SearchUser from '../../pages/Dashboard/SearchUser'
import useSearch from '../../Hooks/useSearch'
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";

const AdminAllRequest = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(0)
    const [name, setName] = useState('')
    const { user } = useAuth();
    const [email, setEmail] = useState('')
    const itemsPerPage = 10;
    // const [data, isFetched, refetch] = useSearch(name, email, currentPage, itemsPerPage)
    // const array = useSearch(name, email, currentPage, itemsPerPage)
    const { data, isFetched, refetch } = useQuery({
        queryKey: ['search', name, email, currentPage, itemsPerPage],
        queryFn: async () => {
            const Search = await axiosSecure.get(`/admin/allrequest?email=${email}&name=${name}&page=${currentPage}&size=${itemsPerPage}`)
            console.log(Search.data);
            return Search?.data;
        }
    })
    const { data: AdminServeMeals, isFetched: pageisFetched, refetch: pageRefetch } = useQuery({
        queryKey: ['ServeMEalsPagination', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pagination/admin/allrequest`)
            console.log(res.data.count, "serveeeee");
            return res.data?.count;
        }
    })

    if (!pageisFetched || !isFetched || !AdminServeMeals) {
        return <h1>loading......</h1>
    }
    console.log(AdminServeMeals);
    const numberOfPages = Math.ceil((AdminServeMeals) / itemsPerPage)
    const pages = [...Array(numberOfPages).keys()];
    console.log(numberOfPages, "pages")
    const handleSearch = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        setName(name)
        setEmail(email)
        refetch()
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
            <SearchUser handleSearch={handleSearch}></SearchUser>
            <div className="overflow-x-auto lg:w-auto w-screen p-2">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Meal title</th>
                            <th>Request by (Email/Name)</th>
                            <th>Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((item, index) => (
                                <AdminEachRequest key={index} refetch={refetch} item={item} index={index}></AdminEachRequest>
                            ))
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

export default AdminAllRequest;