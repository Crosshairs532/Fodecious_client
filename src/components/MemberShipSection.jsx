import { Link } from "react-router-dom";


const MemberShipSection = () => {

    return (
        <div className="container  my-10 mx-auto md:px-6 font-play-serif">
            <section className="mb-32">
                <h2 className="mb-12 text-center text-f-title font-bold text-4xl">Choose Your Membership</h2>
                <div className="grid gap-6 lg:grid-cols-3 lg:gap-x-12">
                    <div className="mb-6 bg-f-bg lg:mb-0">
                        <div
                            className="block h-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                            <div className="border-b-2 border-neutral-100 border-opacity-100 p-6 text-center dark:border-opacity-10">
                                <p className="mb-4 text-xl uppercase">
                                    <strong>Silver</strong>
                                </p>
                                <h3 className="mb-6 text-3xl">
                                    <strong>$ 70</strong>
                                    <small className="text-base text-neutral-500 dark:text-neutral-300">/year</small>
                                </h3>

                                <Link to='/checkout/silver'><button type="button"
                                    className="inline-block w-full rounded bg-f-icon px-6 pt-2.5 pb-2 text-lg font-medium uppercase leading-normal text-f-footer "
                                    data-te-ripple-init data-te-ripple-color="light">
                                    Buy
                                </button></Link>
                            </div>
                            <div className="p-6">
                                <ol className="list-inside">
                                    <li className="mb-4 flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                            stroke="currentColor" className="mr-3 h-5 w-5 text-primary dark:text-primary-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>Unlimited
                                        Discounted Meal Rates
                                    </li>
                                    <li className="mb-4 flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                            stroke="currentColor" className="mr-3 h-5 w-5 text-primary dark:text-primary-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>Git
                                        Priority Access to Special Events
                                    </li>
                                    <li className="mb-4 flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                            stroke="currentColor" className="mr-3 h-5 w-5 text-primary dark:text-primary-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>npm
                                        Flexible Dining Hours
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 bg-f-bg  lg:mb-0">
                        <div
                            className="block h-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                            <div className="border-b-2 border-neutral-100 border-opacity-100 p-6 text-center dark:border-opacity-10">
                                <p className="mb-4 text-xl uppercase">
                                    <strong>Gold</strong>
                                </p>
                                <h3 className="mb-6 text-3xl">
                                    <strong>$ 80</strong>
                                    <small className="text-base text-neutral-500 dark:text-neutral-300">/year</small>
                                </h3>
                                <Link to='/checkout/gold'><button type="button"
                                    className="inline-block w-full rounded bg-f-icon px-6 pt-2.5 pb-2 text-lg font-medium uppercase leading-normal text-f-footer "
                                    data-te-ripple-init data-te-ripple-color="light">
                                    Buy
                                </button></Link>
                            </div>
                            <div className="p-6">
                                <ol className="list-inside">
                                    <li className="mb-4 flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                            stroke="currentColor" className="mr-3 h-5 w-5 text-primary dark:text-primary-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                        Discounted Meal Rates
                                    </li>
                                    <li className="mb-4 flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                            stroke="currentColor" className="mr-3 h-5 w-5 text-primary dark:text-primary-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                        Customizable Meal Plans
                                    </li>
                                    <li className="mb-4 flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                            stroke="currentColor" className="mr-3 h-5 w-5 text-primary dark:text-primary-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                        Preferred Seating and Service
                                    </li>


                                </ol>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 bg-f-bg  lg:mb-0">
                        <div
                            className="block h-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                            <div className="border-b-2 border-neutral-100 border-opacity-100 p-6 text-center dark:border-opacity-10">
                                <p className="mb-4 text-xl uppercase">
                                    <strong>Platinum</strong>
                                </p>
                                <h3 className="mb-6 text-3xl">
                                    <strong>$ 100</strong>
                                    <small className="text-base text-neutral-500 dark:text-neutral-300">/year</small>
                                </h3>
                                <Link to='/checkout/platinum'><button type="button"
                                    className="inline-block w-full rounded bg-f-icon px-6 pt-2.5 pb-2 text-lg font-medium uppercase leading-normal text-f-footer "
                                    data-te-ripple-init data-te-ripple-color="light">
                                    Buy
                                </button></Link>
                            </div>
                            <div className="p-6">
                                <ol className="list-inside">
                                    <li className="mb-4 flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                            stroke="currentColor" className="mr-3 h-5 w-5 text-primary dark:text-primary-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>Unlimited
                                        All-Inclusive Meal Packages
                                    </li>
                                    <li className="mb-4 flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                            stroke="currentColor" className="mr-3 h-5 w-5 text-primary dark:text-primary-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                        Personalized Chef Consultations
                                    </li>
                                    <li className="mb-4 flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                            stroke="currentColor" className="mr-3 h-5 w-5 text-primary dark:text-primary-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                        VIP Dining Experience
                                    </li>

                                    <li className="mb-4 flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                            stroke="currentColor" className="mr-3 h-5 w-5 text-primary dark:text-primary-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>Premium
                                        Exclusive Cooking Classes or Workshops
                                    </li>
                                    <li className="mb-4 flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                            stroke="currentColor" className="mr-3 h-5 w-5 text-primary dark:text-primary-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>Premium
                                        Complimentary Guest Passes
                                    </li>
                                    <li className="mb-4 flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                            stroke="currentColor" className="mr-3 h-5 w-5 text-primary dark:text-primary-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                        order food any time
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

        </div >
    );
};

export default MemberShipSection;