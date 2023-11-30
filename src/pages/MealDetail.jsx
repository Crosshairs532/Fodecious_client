/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { MdOutlineFoodBank, MdOutlineNoFood } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import Review from "../components/Review";
import Marquee from "react-fast-marquee";
import { Rating } from "@mui/material";
import useAxiosPublic from "../Axios/useaxiosPublic";
import { authContext } from "../AuthProvider/AuthProdiver";
import Swal from "sweetalert2";
import MakeReview from "../components/MakeReview";
import useAxiosSecure from "../Axios/useaxiosSecure";
import useLikecheck from "../Hooks/useLikecheck";
import UseReviewcount from "../Hooks/UseReviewcount";
import useReview from "../Hooks/useReview";
import useRole from "../Hooks/useRole";
const Hold_package = ['silver',
    'gold',
    'premium']
const MealDetail = () => {
    const [like, setLike] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false); // New state for button disabled
    const [Reviewsdata, setdata] = useState([]);
    const [RoleName, role] = useRole();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const isLiked = useLikecheck();
    console.log(isLiked);
    const { user, isloading } = useContext(authContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const { review, refetch } = useReview();
    console.log(review, RoleName);

    // Fetch meal details
    const { data: mealData = [], isLoading: mealLoading, refetch: againFetch, isFetched: mealFetched } = useQuery({
        queryKey: ['mealDetail', id],
        enabled: !isloading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/meals?id=${id}`);
            console.log(res.data);
            return res?.data;
        }
    });
    useEffect(() => {
        console.log('running');
        if (isLiked) {
            console.log('after rloao');
            console.log(isLiked);
            const LikeFound = isLiked?.find(item => item.meal_title === mealData[0]?.title);
            const datas = review?.filter(i => i.title === mealData[0]?.title);
            console.log(datas, "afafagbabafklgals");
            {
                datas ? setdata(datas) : []
            }
            {
                LikeFound ? setLike(true) : setLike(false)
            }
        }
        else {
            console.log('not gfoung');
            setLike(false)
        }
    }, [like, isLiked, mealData, review]);

    if (mealLoading) {
        return <div> Loading... </div>;
    }
    console.log(Reviewsdata);
    console.log(mealData[0]?.title);
    // Fetch reviews

    // const [reviews, refetch, isFetched] = UseReviewcount(mealData[0]?.title || '');
    // this query is for fetching all the reviews that this meals deserve.
    // const { data: reviews = [], isLoading: rLoading, refetch, isFetching, isFetched: fetched } = useQuery({
    //     queryKey: ['review', user],
    //     queryFn: async () => {
    //         const res = await axios.get(`fodecious-server.vercel.app/allreviews?title=${data[0]?.title}`)
    //         return res?.data
    //     }
    // })
    // console.log(reviews, "useRevioew");
    // if (!isFetched || !fetched) {
    //     return <h1>loading...</h1>
    // }
    // const { image, category, details, price, rating, title, distributorName, ingredients, count, _id, meal_package = true } = mealData[0] ? mealData[0] : []
    // console.log(isLiked, 'fonrty');
    // if (isLiked) {
    //     const LikeFound = isLiked?.find(item => item.title == title);
    //     {
    //         LikeFound ? setLike(true) : setLike(false)
    //     }
    // }

    const handleLike = async () => {
        if (buttonDisabled) {
            return; // Do nothing if the button is disabled
        }
        if (!user) {
            Swal.fire({
                title: "You have to login First",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Choose to Login",
                denyButtonText: `Deny Login`
            }).then(async (result) => {
                if (result.isConfirmed) {
                    navigate('/');
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            });
        }
        else {
            const res = await axiosSecure.patch(`/meals?id=${_id}`);
            if (res.data.modifiedCount > 0) {
                const likedMeal = { email: user.email, meal_title: title, category: category };
                const likeRes = await axiosSecure.post(`/likedMeals`, likedMeal);
                console.log(likeRes.data.insertedId, "pailam");
                setButtonDisabled(true);
                setLike(true);
                againFetch();
                if (isLiked) {
                    console.log('after rloao');
                    console.log(isLiked);
                    const LikeFound = isLiked?.find(item => item.meal_title === mealData[0]?.title);
                    console.log(LikeFound);
                    {
                        LikeFound ? setLike(true) : setLike(false)
                    }
                    console.log(like);
                }
                else {
                    console.log('not gfoung');
                    setLike(false)
                }
                console.log(like, "after");
            }
            console.log(res.data, "counting ");
        }
    }
    const handleBack = () => {
        navigate('/meals')
    }
    const handleRequesMeal = async () => {
        if (!user) {
            Swal.fire({
                title: "You have to login First",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Choose to Login",
                denyButtonText: `Deny Login`
            }).then(async (result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            });
        }
        else {
            if (!meal_package) {
                console.log("heloo");
                Swal.fire({
                    title: "Buy Package Before Requesting For Meals",
                })
            }
            else {
                // refetch()
                console.log(Reviewsdata.length, "vai eta lenght");
                const meal_user = { username: user?.displayName, email: user?.email, image, category, details, price, rating, title: mealData[0].title, distributorName, ingredients, count: mealData[0].count, rcount: Reviewsdata.length, meal_package, status: 'pending', request_count: 1 }
                console.log(meal_user);
                const res = await axiosPublic.post(`/allRequest?title=${title}`, meal_user)
                console.log(res.data);
                if (res.data.insertedId || res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `You have Requested for ${title}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            }
        }
    }
    if (!mealFetched || !mealData[0]?.title) {
        return <h1>loading...</h1>;
    }
    const { image, category, details, price, rating, title, postTime, distributorName, ingredients, count, rcount, _id, meal_package = Hold_package?.includes(RoleName) } = mealData[0] || {};
    return (
        <div>
            <div className="relative w-full border-2 h-[50vh] bg-f-btn">
                <img className="h-[50vh] object-center w-full" src={image} alt="" />

                {/* Overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-neutral-950 opacity-50"></div>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
                    <h1 className="text-5xl font-Nunito text-f-icon font-extrabold">{title}</h1>
                </div>
            </div>
            <div className=" px-[40px] py-5 text-white title_distributor_time_rating flex items-center justify-between container mx-auto">
                <div className=" flex-grow">
                    <div>
                        <h1 className=" text-2xl">Distributer: {distributorName ? distributorName : 'tanzim'}</h1>
                        <Rating
                            name="simple-controlled"
                            value={rating}
                        />
                        <h1><span className=" font-Nunito">Posted Time</span>:{postTime ? postTime : 'time not Given'}</h1>
                    </div>
                    <button onClick={handleBack} className=" btn bg-f-title font-Nunito text-lg px-6 py-1 text-f-icon">
                        All
                    </button>

                </div>
                <h1 className=" text-f-footer flex-grow flex justify-center"><MdOutlineNoFood size={80} /></h1>
                <div className=" flex flex-col flex-grow items-end justify-center">
                    <button onClick={handleRequesMeal} className=" w-1/2 flex-grow btn bg-f-title text-f-icon ">Request Meal</button>
                    <button
                        disabled={like || buttonDisabled} // Disable if already liked or buttonDisabled is true
                        className="w-1/2 flex-grow btn bg-f-title text-f-icon"
                        onClick={handleLike}
                    >
                        {!like ? <ThumbUpIcon /> : <FavoriteIcon></FavoriteIcon>}
                    </button>

                    <p>{count}</p>
                </div>
            </div>
            <div className="flex p-10 container mx-auto flex-col justify-center w-full lg:flex-row">
                <div className=" lg:w-1/2 flex-grow bg-f-icon card rounded-box ">
                    <h1 className=" text-left pb-4 text-4xl font-play-serif font-semibold">Description:</h1>
                    <p className=" text-xs font-play-serif text-justify">

                        {
                            details
                        }
                    </p>
                </div>
                <div className="divider lg:divider-horizontal"></div>
                <div className=" lg:w-1/2 flex-grow bg-f-icon card px-6  rounded-box ">
                    <h1 className=" text-4xl font-play-serif pb-3">Ingridients:</h1>
                    <div className=" w-full h-full">
                        {
                            ingredients ? <p>{ingredients}</p> : 'Not Given'
                        }
                    </div>
                </div>
            </div>
            <div className=" container mx-auto pb-10">
                <h1 className=" font-play-serif p-5 font-semibold text-4xl">Reviews : {Reviewsdata?.length}</h1>
                <MakeReview meal_id={_id} title={title} refetch={refetch}></MakeReview>
                <Marquee pauseOnHover speed={100} gradientColor=" white" gradient gradientWidth={200}>
                    {

                        Reviewsdata?.length > 0 ? (
                            Reviewsdata?.map((review) => (
                                <Review key={review._id} review={review}></Review>
                            ))
                        ) : (
                            <p className=" text-4xl">No reviews available</p>
                        )
                    }

                </Marquee>
            </div>
        </div >


    );
};

export default MealDetail;