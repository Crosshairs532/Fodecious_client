/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { FaGoogleWallet } from 'react-icons/fa';
import { useForm } from "react-hook-form"
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../AuthProvider/AuthProdiver';
import useAxiosPublic from '../../Axios/useaxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { BallTriangle } from 'react-loader-spinner';

const UpdateReview = ({ id }) => {
    console.log(id);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { user } = useContext(authContext);
    const { data, isFetched, refetch } = useQuery({
        queryKey: ['update_review', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/allreviews?id=${id}`)
            return res.data
        }
    })
    console.log(data, "after, before");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()


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
    const onSubmit = async (newReviews) => {

        const { rating } = newReviews;
        const review = { rating: parseFloat(rating), comment: newReviews.comment, username: user?.displayName, email: user.email, title: data.title }
        const res = await axiosPublic.patch(`/allreviews?id=${id}`, review)
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
            refetch()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Updated Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }

    }


    return (
        <div>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className=" btn btn-xs btn-secondary" onClick={() => document.getElementById('my_modal_2').showModal()}>Edit Review</button>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h1 className=' text-6xl flex justify-center'>
                        <FaGoogleWallet></FaGoogleWallet>
                    </h1>
                    <form className=' gap-2 flex flex-col justify-center items-center' onSubmit={handleSubmit(onSubmit)}>
                        <textarea defaultValue={data[0]?.comment} placeholder="Comment on the Meal..." {...register("comment")} className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
                        <input {...register("rating")} defaultValue={data[0]?.rating} type="number" placeholder="Type here" className="input input-bordered input-sm w-full max-w-xs" />
                        <button type='submit'>Submit Review</button>
                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div >
    );
};
export default UpdateReview;