/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Rating } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosPublic from "../Axios/useaxiosPublic";
import useAuth from "../Hooks/useAuth";


const UpcomingCard = ({ upMeal, UpcomingFetch }) => {
    const axiosPublic = useAxiosPublic();
    const { user, isloading } = useAuth();
    const { data, refetch } = useQuery({
        queryKey: ['upcomingMeals', upMeal],
        enabled: !isloading,
        queryFn: async () => {
            const result = await axiosPublic.get(`/upcomingLikedMeals?email=${user.email}&title=${upMeal?.title}`)
            console.log(result.data, "upcomingData");
            return result.data
        }
    })
    const handleLike = async () => {
        const mealsInfo = { email: user?.email, meal_title: upMeal?.title, category: upMeal?.category, Extra: 'upcoming' };
        const like = await axiosPublic.post('/likedMeals', mealsInfo)
        console.log(like.data);
        refetch()
        UpcomingFetch()
    }
    console.log(data?.likeInfo);
    return (
        <div>

            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={upMeal?.image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{upMeal?.title}</h2>
                    <div className=" flex gap-2">
                        <p>Students Like this Meal:{upMeal.count}</p>
                        <p>Reviews count:{upMeal.rcount}</p>
                    </div>
                    <Rating
                        name="simple-controlled"
                        value={upMeal.rating}
                    />
                    <div className="card-actions justify-end">
                        <button disabled={data?.likeInfo} onClick={handleLike} className="btn btn-primary">Like me</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default UpcomingCard;