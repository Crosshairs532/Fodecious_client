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

const roleIcons = {
    'i': 'am',
    'bronze': BsStack,
    'silver': SiSparkar,
    'gold': GiGoldShell,
    'premium': MdWorkspacePremium,
    'Platinum': MdAdminPanelSettings
};

const Profile = () => {
    const { user, isloading } = useContext(authContext)
    const [RoleName,
        role,
        all_badge,
        isFetched] = useRole();
    console.log(user, all_badge);
    if (isloading) {
        return <h1>loading....</h1>
    }
    console.log(all_badge);
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
                            {/* <p className=" text-f-footer font-Nunito">{ }</p> */}
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Badges</h2>
                    <div className="flex gap-5">

                        {all_badge.length > 0 ? (
                            all_badge.map((badge, idx) => {
                                const BadgeIcon = roleIcons[badge.toString()];
                                return BadgeIcon ? <BadgeIcon size={30} key={idx} /> : null;
                            })
                        ) : (
                            <p>No badges to display</p>
                        )}

                    </div>
                </div>
            </div>
        </>
    );

};




export default Profile;
