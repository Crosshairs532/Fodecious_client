import Banner from "../components/Banner";
import FoodService from "../components/FoodService";
import MemberShipSection from "../components/MemberShipSection";
import TopPreferred from "../components/TopPreferred";
import '../index.css'

const Home = () => {
    return <>
        <div className=" h-[100vh] bg">
            <Banner></Banner>
        </div>
        <div className=" bg-[#f2f2f2] min-h-screen container py-4  mx-auto">
            <div className=" w-[100%] flex justify-center items-center flex-col h-full">
                <h1 className=" text-4xl p-2  font-play-serif font-medium text-f-title">Top Preffered Meals</h1>
                <p className=" text-sm text-f-footer font-play-serif pb-10">by the students</p>
                <TopPreferred></TopPreferred>

            </div>
        </div>
        <div className=" min-h-screen container mx-auto font-play-serif py-8 space-y-[70px]">
            <h1 className=" text-4xl font-play-serif text-f-title font-bold"> Meals a Day</h1>
            <FoodService></FoodService>
        </div >
        <div className=" bg-[#f2f2f2]">
            <MemberShipSection></MemberShipSection>
        </div>
    </>
};

export default Home;