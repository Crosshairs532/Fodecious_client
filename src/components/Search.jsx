/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";

const Search = ({ setSearchvalue }) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        setSearchvalue(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            <div className="flex flex-col md:flex-row items-center justify-evenly gap-5">
                <div className="mb-4 md:mb-0 w-full md:w-1/3">
                    <input
                        {...register("category")}
                        type="text"
                        placeholder="Search by category"
                        className="input input-bordered input-info w-full"
                    />
                </div>

                <div className="border-2 p-4">
                    <label className="block mb-2">Filter by Price range</label>
                    <div className="flex">
                        <div className="mr-4">
                            <label className="block mb-1" htmlFor="Minprice">
                                Min:
                            </label>
                            <input
                                {...register("Minprice")}
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered input-sm w-24"
                            />
                        </div>
                        <div>
                            <label className="block mb-1" htmlFor="Maxprice">
                                Max:
                            </label>
                            <input
                                {...register("Maxprice")}
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered input-sm w-24"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <button
                type="submit"
                className="btn mt-4 md:mt-0 bg-f-icon text-f-title"
            >
                Search
            </button>
        </form>
    );
};

export default Search;
