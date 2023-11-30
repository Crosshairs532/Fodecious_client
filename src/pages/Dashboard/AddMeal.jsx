/* eslint-disable no-unused-vars */
import Lottie from 'lottie-react';
import { useForm, Controller } from 'react-hook-form';
import logo from '.././../assets/sp.json'
import { useState } from 'react';
import axios from 'axios';
import useAxiosSecure from '../../Axios/useaxiosSecure';
import Swal from 'sweetalert2';
import { GiCogLock } from 'react-icons/gi';
import useAxiosPublic from '../../Axios/useaxiosPublic';
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddMeal = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [routes, setRoute] = useState('')
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {

        console.log(data, routes);
        if (routes === 'addmeal') {
            const imageFile = { image: data.image[0] }
            console.log(imageFile);
            const res = await axios.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            const photo = res.data?.data?.display_url;
            if (photo) {
                const meal_info = {
                    title: data.title, details: data.details, category: data.category, rating: parseFloat(data.rating), price: data.price, postTime: data.dateTime, ingredients: data.ingredients, count: parseInt(data.count), rcount: parseInt(data.reviews), distributorName: data.adminName,
                    distributorEmail: data.adminEmail, image: photo
                }
                const add_response = await axiosSecure.post('/meals', meal_info);
                if (add_response.data.insertedId) {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `${data.title} has been added to meals`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    reset()
                }
            }
        }
        if (routes === 'addupcoming') {
            console.log(routes);
            const imageFile = { image: data.image[0] }
            console.log(imageFile);
            const res = await axios.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            const photo = res.data?.data?.display_url;
            if (photo) {
                const meal_info = {
                    title: data.title, details: data.details, category: data.category, rating: parseFloat(data.rating), price: data.price, postTime: data.dateTime, ingredients: data.ingredients, count: parseInt(data.count), rcount: parseInt(data.reviews), distributorName: data.adminName,
                    distributorEmail: data.adminEmail, image: photo
                }
                console.log(meal_info);
                const add_response = await axiosSecure.post('/upcoming', meal_info);
                if (add_response.data.insertedId) {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `${data.title} has been added to upcoming`,
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            }
        }
    }

    const handleRoute = (route) => {
        setRoute(route)
    }

    return (
        <>
            <div className=' flex justify-between px-12'>

                <h1 className=' md:text-4xl text-2xl lg:text-7xl  opacity-25 '>Hostel Meal Form</h1>
                <h1 className=' text-center flex justify-center'> <Lottie className=" lg:block mg:block w-[100px]" animationData={logo} loop={true}></Lottie></h1>
            </div>
            <div className="container mx-auto px-4 py-10 bg-white rounded-lg shadow-2xl">
                <form className=' grid  grid-cols-5' onSubmit={handleSubmit(onSubmit)}>
                    {/* Meal Title */}
                    <div className="mb-2 col-span-5">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Meal Title
                        </label>
                        <input
                            {...register('title', { required: 'Meal title is required' })}
                            type="text"
                            id="title"
                            placeholder='Meal title..'
                            className="input input-bordered w-full"
                        />
                        {errors.title && (
                            <p className=" text-f-error text-xs mt-1">*{errors.title.message}</p>
                        )}
                    </div>
                    {/* Description */}
                    <div className="mb-2 col-span-5">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="details">
                            Description
                        </label>
                        <textarea
                            {...register('details', { required: 'Details is required' })}
                            id="details"
                            placeholder=' Add details to your meal...'
                            className="textarea textarea-bordered w-full"
                        />
                        {errors.details && (
                            <p className=" text-f-error text-xs mt-1">{errors.description.message}</p>
                        )}
                    </div>
                    <div className=' col-span-5 flex-col lg:flex-row md:flex-row flex gap-3'>
                        {/* Meal Type/Category */}
                        <div className="mb-2 col-span-1 flex-grow">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                                Meal Type/Category
                            </label>
                            <select
                                {...register('category', { required: 'Meal category is required' })}
                                id="category"
                                className="input input-bordered w-full"
                            >
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                            </select>
                            {errors.category && (
                                <p className=" text-f-error text-xs mt-1">{errors.category.message}</p>
                            )}
                        </div>

                        {/* Price */}
                        <div className="mb-2 col-span-2 flex-grow">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                Price
                            </label>
                            <input
                                {...register('price', { required: 'Price is required' })}
                                type="number"
                                id="price"
                                placeholder='$0.0'
                                className="input input-bordered w-full"
                            />
                            {errors.price && (
                                <p className=" text-f-error text-xs mt-1">{errors.price.message}</p>
                            )}
                        </div>
                        {/* Rating */}
                        <div className="mb-2 col-span-2 flex-grow">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
                                Rating
                            </label>
                            <input
                                {...register('rating', { required: 'Rating is required' })}
                                type="number"
                                id="rating"
                                placeholder=' 0-5'
                                className="input input-bordered w-full"
                            />
                            {errors.rating && (
                                <p className=" text-f-error text-xs mt-1">{errors.rating.message}</p>
                            )}
                        </div>
                    </div>



                    {/* Ingredients */}
                    <div className="mb-2 col-span-5">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ingredients">
                            Ingredients
                        </label>
                        <textarea
                            {...register('ingredients', { required: 'Ingredients are required' })}
                            id="ingredients"
                            placeholder=' what was to make this meal...'
                            className="textarea textarea-bordered w-full"
                        />
                        {errors.ingredients && (
                            <p className=" text-f-error text-xs mt-1">{errors.ingredients.message}</p>
                        )}
                    </div>



                    <div className=' col-span-5 flex gap-2 flex-col md:flex-row lg:flex-row'>


                        {/* Time/Date */}
                        <div className="mb-2 flex-grow">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateTime">
                                Time/Date
                            </label>
                            <input
                                {...register('dateTime', { required: 'Time/Date is required' })}
                                type="date"
                                id="dateTime"
                                className="input input-bordered w-full"
                            />
                            {errors.dateTime && (
                                <p className=" text-f-error text-xs mt-1">{errors.dateTime.message}</p>
                            )}
                        </div>

                        {/* Likes */}
                        <div className="mb-2 flex-grow">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="likes">
                                Likes
                            </label>
                            <input
                                {...register('count', { required: 'Likes are required' })}
                                type="number"
                                id="count"
                                defaultValue={0}
                                placeholder=' how many students liked it ....'
                                className="input input-bordered w-full"
                            />
                            {errors.likes && (
                                <p className=" text-f-error text-xs mt-1">{errors.likes.message}</p>
                            )}
                        </div>

                        {/* Reviews */}
                        <div className="mb-2 flex-grow">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reviews">
                                Reviews
                            </label>
                            <input
                                {...register('reviews', { required: 'Reviews are required' })}
                                defaultValue={0}
                                type="number"
                                id="reviews"
                                placeholder=' number of reviews...'
                                className="input input-bordered w-full"
                            />
                            {errors.reviews && (
                                <p className=" text-f-error text-xs mt-1">{errors.reviews.message}</p>
                            )}
                        </div>

                    </div>
                    <div className=' col-span-5 flex gap-3 flex-row'>
                        {/* Admin/Distributor Name */}
                        <div className="mb-2 flex-grow">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="adminName">
                                Admin/Distributor Name
                            </label>
                            <input
                                {...register('adminName', { required: 'Admin/Distributor Name is required' })}
                                type="text"
                                id="adminName"
                                placeholder=' Add Admin/Distributor Name'
                                className="input input-bordered w-full"
                            />
                            {errors.adminName && (
                                <p className=" text-f-error text-xs mt-1">{errors.adminName.message}</p>
                            )}
                        </div>

                        {/* Admin/Distributor Email */}
                        <div className="mb-2 flex-grow">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="adminEmail">
                                Admin/Distributor Email
                            </label>
                            <input
                                {...register('adminEmail', { required: 'Admin/Distributor Email is required' })}
                                type="email"
                                id="adminEmail"
                                placeholder='Admin/Distributor Email....'
                                className="input input-bordered w-full"
                            />
                            {errors.adminEmail && (
                                <p className=" text-f-error text-xs mt-1">{errors.adminEmail.message}</p>
                            )}
                        </div>
                    </div>
                    {/* Meal Image */}
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                            Meal Image
                        </label>
                        <input type="file"  {...register('image', { required: 'choose meal image' })} className="file-input file-input-bordered w-full max-w-xs" />
                    </div>
                    <div className="mt-6 flex justify-between col-span-5">
                        <button onClick={() => handleRoute('addmeal')} name='addmeal' type="submit" className="btn btn-primary mr-2">
                            Add Meal
                        </button>
                        <button name='addupcoming' onClick={() => handleRoute('addupcoming')} type="submit" className="btn btn-secondary">
                            Add to Upcoming
                        </button>
                    </div>
                </form>
            </div></>
    );
};


export default AddMeal;
