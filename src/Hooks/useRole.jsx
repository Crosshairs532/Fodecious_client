/* eslint-disable react-hooks/rules-of-hooks */
// useRole.js
import { useContext, useEffect, useState } from "react";
import { authContext } from "../AuthProvider/AuthProdiver";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Axios/useaxiosPublic";
import { BsStack } from "react-icons/bs";
import { SiSparkar } from "react-icons/si";
import { MdWorkspacePremium } from "react-icons/md";
import { GiGoldShell } from "react-icons/gi";
import { MdAdminPanelSettings } from "react-icons/md";
import useAxiosSecure from "../Axios/useaxiosSecure";

const roleIcons = {
    // 'i': 'am',
    'bronze': BsStack,
    'silver': SiSparkar,
    'gold': GiGoldShell,
    'premium': MdWorkspacePremium,
    'Platinum': MdAdminPanelSettings

};
const useRole = () => {
    const [RoleName, setRoleName] = useState('')
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user, isloading } = useContext(authContext);
    const [role, setRole] = useState('not given');
    const [all_badge, setAllbadges] = useState([]);
    const { data = [], isLoading, isFetched } = useQuery({
        queryKey: ['findingRole', user?.email],
        enabled: !isloading,
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/user?email=${user?.email}`);
                console.log(res?.data, "useROle hajajajaj");
                return [res?.data[0]?.badge, res.data[0]?.all_badge]
            } catch (error) {
                console.log('Error', error.message);
            }
        },
    });

    useEffect(() => {
        if (data[0] && roleIcons[data[0].toString()]) {
            console.log(data[0], 'ssss');
            setRoleName(data[0])
            console.log(roleIcons[data[0].toString()]);
            setRole(roleIcons[data[0].toString()]);
            setAllbadges(data[1])
        }
    }, [data, isFetched]);
    console.log(RoleName,
        role,
        all_badge,
        isFetched, "useeeeeRoleee");
    return [
        RoleName,
        role,
        all_badge,
        isFetched
    ];
};

export default useRole;
