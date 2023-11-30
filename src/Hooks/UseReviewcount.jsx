/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "./useAuth";
import { useContext } from "react";
import { authContext } from "../AuthProvider/AuthProdiver";
import useAxiosPublic from "../Axios/useaxiosPublic";

const UseReviewcount = (title) => {
    const axiosPublic = useAxiosPublic();
    console.log(title, "waht ");
    const { data: reviews = [], isLoading: rLoading, refetch, isFetched } = useQuery({
        queryKey: ['review', title],
        queryFn: async () => {
            const res = await axiosPublic.get(`/allreviews?title=${title}`)
            return res?.data
        }
    })
    console.log(reviews, "kire vai");
    if (!isFetched) {
        return <h1>loading....</h1>
    }
    return [reviews.length, reviews, refetch, isFetched]
};
export default UseReviewcount;