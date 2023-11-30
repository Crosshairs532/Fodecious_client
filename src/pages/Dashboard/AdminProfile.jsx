/* eslint-disable no-unused-vars */
import useRole from "../../Hooks/useRole";
import { BsStack } from "react-icons/bs";
import { SiSparkar } from "react-icons/si";
import { MdWorkspacePremium } from "react-icons/md";
import { GiGoldShell } from "react-icons/gi";
import { useContext, useEffect, useState } from 'react';
import { MdAdminPanelSettings } from "react-icons/md";
// import avatarImage from './path/to/avatar.jpg';
import { authContext } from "../../AuthProvider/AuthProdiver";
import UseAdminAdd from "../../Hooks/UseAdminAdd";
import useAuth from "../../Hooks/useAuth";
import { BallTriangle } from 'react-loader-spinner'
const roleIcons = {
    'bronze': BsStack,
    'silver': SiSparkar,
    'gold': GiGoldShell,
    'premium': MdWorkspacePremium,
    'Platinum': MdAdminPanelSettings
};

const AdminProfile = () => {
    const [addCount, setAddcount] = useState(0)
    const { user } = useAuth();
    const [
        RoleName,
        role,
        all_badge,
        isFetched
    ] = useRole();
    const data = UseAdminAdd();
    if (!data[1]) {
        return <div className=" min-h-screen flex justify-center items-center">
            < BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}
                }
                wrapperStyle=""
                visible={true}
            />
        </div>
    }

    return (
        <>
            <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center">
                    <img
                        src={user.photoURL}
                        alt="User Avatar"
                        className="rounded-full h-16 w-16 object-cover mr-4"
                    />
                    <div className=" flex flex-col">
                        <h1 className="text-2xl font-semibold font-Nunito flex items-center gap-3">{user?.displayName} {role} </h1>
                        <div> <p className=" text-f-footer">{user?.email}</p>
                            <p className=" text-f-footer font-Nunito">Meals Added by Admin:{data[0].length}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Badges</h2>
                    <div className="flex gap-5">
                        {

                            Object.keys(roleIcons).map((role, index) => {
                                const IconComponent = roleIcons[role];
                                return (
                                    <IconComponent key={index} size={30} />
                                );
                            })



                        }

                    </div>
                </div>
            </div >
        </>
    );

};




export default AdminProfile;
// {all_badge.length > 0 ? (
//     all_badge.map((badge, idx) => {
//         const BadgeIcon = roleIcons[badge.toString()];
//         return BadgeIcon ? <BadgeIcon size={30} key={idx} /> : null;
//     })
// ) : (
//     <p>No badges to display</p>
// )}
