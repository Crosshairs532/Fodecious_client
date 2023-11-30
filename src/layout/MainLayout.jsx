import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className=" min-h-screen">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>

        </div>
    );
};

export default MainLayout;