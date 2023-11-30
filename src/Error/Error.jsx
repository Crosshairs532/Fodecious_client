


import Lottie from "lottie-react";
import err from '../../public/err.json'
import { useNavigate } from "react-router-dom";
const Error = () => {
    const GoTo = useNavigate();
    const Goback = () => {
        GoTo('/')
    }
    return (
        <div className=" flex flex-col min-h-screen justify-center items-center bg-black w-full">

            <div className=" w-[200px] h-[200px] lg:w-[500px] lg:h-[600px] mx-auto">
                <Lottie animationData={err} loop={true}></Lottie>
            </div>
            <div>
                <button onClick={Goback} className=" btn">Go Home</button>
            </div>
        </div>
    );
};

export default Error;