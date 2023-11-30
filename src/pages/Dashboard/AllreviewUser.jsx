/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import UseReviewcount from "../../Hooks/UseReviewcount";
const AllreviewUser = ({ meal, handleDelete, idx }) => {
    const [Total, setTotal] = useState(0);
    const [loopFetch, setFetch] = useState(null);
    const { _id, title,
        count,
        rcount,
        status, meal_id } = meal
    console.log(title);
    const ReviewHook = UseReviewcount(title);
    return (
        <>
            <tr key={idx}>
                <td>{idx}</td>
                <td>{meal.title}</td>
                <td>{meal.count}</td>
                <td>
                    {ReviewHook[0]}
                </td>
                <td>
                    <button onClick={() => handleDelete(meal, ReviewHook[1], ReviewHook[2])} className=" btn bg-f-bg text-f-error text-white">
                        <FaTrash></FaTrash>
                    </button>
                </td>
                <td>
                    <Link to={`/detail/${meal_id}`}><button className=" btn bg-f-title text-f-icon font-Nunito">Details</button></Link>
                </td>
            </tr>
        </>
    );
};

export default AllreviewUser;