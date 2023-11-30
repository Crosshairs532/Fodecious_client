import { useContext } from "react";
import { authContext } from "../AuthProvider/AuthProdiver";

const useAuth = () => {
    const user = useContext(authContext)
    console.log(user, "useAuth");
    return user;
};

export default useAuth;