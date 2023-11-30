import logo from '../assets/sp.json'
import Lottie from "lottie-react";
import { MdOutlineNoFood } from "react-icons/md";
const Footer = () => {
    return (
        <div>
            <div className=' bg-f-footer text-f-title'>
                <footer className=" container mx-auto footer p-10 ">

                    <aside>
                        <h1 className=' w-[100px]'> <Lottie className=" hidden border-2 lg:block mg:block w-full" animationData={logo} loop={true}></Lottie></h1>
                        <h1 className=' text-2xl'><span className=' flex items-center'>F <MdOutlineNoFood /> decios</span><br /></h1>
                    </aside>
                    <nav>
                        <header className=" text-f-icon footer-title">Services</header>
                        <a className="       link link-hover">Hygenic Food</a>
                        <a className="       link link-hover">Meal Plans</a>
                        <a className="       link link-hover">Nutritional Information</a>
                        <a className="       link link-hover">Online Ordering System</a>
                    </nav>
                    <nav>
                        <header className="footer-title text-f-icon ">University Hostel Meal</header>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>

                    </nav>
                    <nav>
                        <header className="footer-title text-f-icon ">Legal</header>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </nav>

                </footer >

            </div>
        </div >
    );
};

export default Footer;