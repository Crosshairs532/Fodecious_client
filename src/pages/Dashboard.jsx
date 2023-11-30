/* eslint-disable no-unused-vars */
// import { FaOpencart } from "react-icons/fa6";
// import { FaBook, FaHome, FaList, FaUser, FaUsers, FaUtensils } from "react-icons/fa";
// import { MdRateReview } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
// import { TbBrandBooking } from "react-icons/tb";
import { MdReviews } from "react-icons/md";
import { TfiMenu } from "react-icons/tfi";
import useAdmin from "../Hooks/useAdmin";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const isAdmin = useAdmin();
    console.log(isAdmin[0], "admin checking");
    return (
        <div className="drawer min-h-screen lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content py-4">
                <label htmlFor="my-drawer-2" className="btn bg-neutral-300 drawer-button lg:hidden"><TfiMenu></TfiMenu></label>
                <div className="flex-1 ">
                    <Outlet />
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">

                    {/* Sidebar content here */}
                    {
                        !isAdmin[0] ? <>
                            <li>
                                <NavLink to='/' className="text-xl flex gap-2 items-center">
                                    <MdReviews />
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/profile' className="text-xl flex gap-2 items-center">
                                    <MdReviews />
                                    My Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/myReviews' className="text-xl flex gap-2 items-center">
                                    <MdReviews />
                                    My Reviews
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to='/dashboard/myRequests' className="text-xl flex gap-2 items-center">
                                    <MdReviews />
                                    Requested Meals
                                </NavLink>
                            </li>
                        </>
                            :
                            <>
                                <li>
                                    <NavLink to='/dashboard/admin' className="text-xl flex gap-2 items-center">
                                        Admin Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/alluser' className="text-xl flex gap-2 items-center">
                                        Manage Users
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/addmeal' className="text-xl flex gap-2 items-center">
                                        Add Meal
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/allmeal' className="text-xl flex gap-2 items-center">
                                        All Meals
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/servermeal' className="text-xl flex gap-2 items-center">
                                        Serve Meals
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/allreview' className="text-xl flex gap-2 items-center">
                                        All Reviews
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to='/dashboard/upcoming' className="text-xl flex gap-2 items-center">
                                        Upcoming Meals
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/' className="text-xl flex gap-2 items-center">
                                        <MdReviews />
                                        Home
                                    </NavLink>
                                </li>
                            </>
                    }
                </ul>
            </div>
        </div >

    );
};

export default Dashboard;