/* eslint-disable no-unused-vars */
import { MdOutlineNoFood } from "react-icons/md";
import logo from '../assets/sp.json'
import { Link, NavLink, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { IoIosLogOut } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../AuthProvider/AuthProdiver";
import useRole from "../Hooks/useRole";
import Swal from "sweetalert2";
import useAdmin from "../Hooks/useAdmin";

const Navbar = () => {
    const { user, logOut } = useContext(authContext);
    const [isAdmin, isAdminloading] = useAdmin();
    const goTo = useNavigate();
    const [
        RoleName,
        role,
        all_badge,
        isFetched
    ] = useRole();


    const nav_items =
        <>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/meals'>Meals</NavLink></li>
            <li><NavLink to='/upcoming'>Upcoming Meals</NavLink></li>
        </>

    console.log(role, "roleee");
    const handleLogout = () => {
        logOut()
            .then(res => {

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "logged Out Successfuly",
                    showConfirmButton: false,
                    timer: 1500
                });
                goTo('/')
            })
    }

    return (
        <div className="bg-f-footer">
            <div className="navbar mx-auto container font-Nunito">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                nav_items
                            }
                        </ul>
                    </div>
                    <h1 className=' w-[50px] border-2  hidden lg:block mg:block'> <Lottie className=" w-full" animationData={logo} loop={true}></Lottie></h1>
                    <h1 className="  text-f-icon flex items-center gap-2 text-2xl">F<MdOutlineNoFood></MdOutlineNoFood>decios</h1>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1  text-f-icon  text-lg font-bold">
                        {
                            nav_items
                        }

                    </ul>
                </div>
                <div className="navbar-end">
                    <button className="btn btn-ghost btn-circle text-f-title">
                        <div className="indicator ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button>
                    <div className="dropdown dropdown-end">
                        {
                            !user && <button className=" btn text-f-icon bg-f-title font-Nunito font-semibold "><NavLink to='/login'>Join Us</NavLink></button>
                        }
                        {
                            user &&

                            <>
                                <label tabIndex={0} className="btn btn-ghost z-20 btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                    <li>
                                        <a className="justify-between">
                                            Profile
                                            <span>{role}</span>
                                        </a>
                                    </li>
                                    <li><h1>Name:{user?.displayName}</h1></li>
                                    {!isAdmin ? <li><Link to='/dashboard/profile'>Dashboard</Link></li> : <li><Link to='/dashboard/admin'>Dashboard</Link></li>}

                                    <li><button onClick={handleLogout} className=" active:text-f-icon text-f-footer outline outline-f-footer active:bg-f-footer">Logout <IoIosLogOut /></button></li>
                                </ul>
                            </>
                        }
                    </div>
                </div>
            </div>

        </div >
    );
};

export default Navbar;