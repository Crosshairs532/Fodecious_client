/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../AuthProvider/AuthProdiver";
import UpdateReview from "./UpdateReview";
import { Link } from "react-router-dom";
import UseReviewcount from "../../Hooks/UseReviewcount";
import { BallTriangle } from "react-loader-spinner";
import useAxiosPublic from "../../Axios/useaxiosPublic";
const EachMeal = ({ meal, handleDelete }) => {
    const [Total, setTotal] = useState(0);
    const [loopFetch, setFetch] = useState(null);
    const axiosPublic = useAxiosPublic();
    const { _id, title,
        count,
        rcount,
        status, meal_id } = meal
    const ReviewHook = UseReviewcount(title);
    console.log(Total, "EachMEal");
    const { data, isLoading, refetch: fetch, isFetched } = useQuery({
        queryKey: ['meal', title],
        queryFn: async () => {
            const res = await axiosPublic.get(`/meals?title=${title}`)
            return res?.data
        }
    })
    if (!isFetched) {
        return <div className=' min-h-screen flex justify-center items-center'>
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}
            />
        </div>
    }

    return (
        <tr>
            <th><button onClick={() => handleDelete(_id, ReviewHook[1])} className="btn btn-circle btn-outline btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button></th>
            <td>{meal.title}</td>
            <td>{data[0]?.count}</td>
            <td>{ReviewHook[0]}</td>
            <td><UpdateReview id={_id}></UpdateReview></td>
            <td><Link to={`/detail/${meal_id}`}><button className=" btn">view meal</button></Link></td>

        </tr>


    );
};

export default EachMeal;