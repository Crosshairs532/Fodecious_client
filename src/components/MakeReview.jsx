/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { FaGoogleWallet } from 'react-icons/fa';
import { useForm } from "react-hook-form"
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { authContext } from '../AuthProvider/AuthProdiver';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../Axios/useaxiosPublic';

const MakeReview = ({ title, refetch, meal_id }) => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { user } = useContext(authContext);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const [isDisabled, setdisabled] = useState(true);
    const [today, setToday] = useState();
    // useEffect(() => {
    //     refetch()
    // }, [title])
    // count - review count;
    // newly updated:
    //  count- like count
    //  rcount- review count;
    const onSubmit = async (data) => {
        const { rating } = data;
        const review = { rating: parseFloat(rating), comment: data.comment, username: user?.displayName, email: user.email, title: title, count: 0, rcount: 1, meal_id: meal_id }
        console.log(title);
        const res = await axiosPublic.post(`/allreviews`, review)
        console.log(res.data);
        if (res.data.insertedId) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Successful Review",
                showConfirmButton: false,
                timer: 1500
            });
            refetch()
        }
    }
    const handleReview = () => {
        if (user) {
            document.getElementById('my_modal_2').showModal()
        }
        else {
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

    }


    return (
        <div>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className=" btn btn-xs btn-success text-f-bg mx-3" onClick={handleReview}>Give Review</button>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h1 className=' text-6xl flex justify-center'>
                        <FaGoogleWallet></FaGoogleWallet>
                    </h1>
                    <form className=' gap-2 flex flex-col justify-center items-center' onSubmit={handleSubmit(onSubmit)}>
                        <textarea placeholder="Comment on the Meal..." {...register("comment")} className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
                        <input {...register("rating")} type="number" placeholder="Type here" className="input input-bordered input-sm w-full max-w-xs" />
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
export default MakeReview;