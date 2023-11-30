import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Axios/useaxiosPublic";
import Lottie from "lottie-react";
// import logo from '.././assets/loading.json'
import UpcomingCard from "./UpcomingCard";
import { BallTriangle } from "react-loader-spinner";

const Upcoming = () => {
    const axiosPublic = useAxiosPublic();
    const { data, isFetched, refetch: UpcomingFetch } = useQuery({
        queryKey: ['upcoming'],
        queryFn: async () => {
            const AllUpcomingMeals = await axiosPublic.get('/upcoming');
            console.log(AllUpcomingMeals.data, "ahfjahfahfhas");
            return AllUpcomingMeals.data;
        }
    })

    if (!isFetched) {

        return <div className=" min-h-screen flex justify-center items-center"> <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
        /> </div>
    }

    return (
        <div className="  grid grid-cols-1 pt-4 place-items-center md:grid-cols-2 lg:grid-cols-3">
            {
                data?.map(upMeal => (
                    <UpcomingCard UpcomingFetch={UpcomingFetch} key={upMeal._id} upMeal={upMeal}></UpcomingCard>
                ))
            }

        </div>
    );
};

export default Upcoming;