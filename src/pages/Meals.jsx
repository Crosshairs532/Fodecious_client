// /* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from '@tanstack/react-query';
// import Search from '../components/Search';
import Searchfilter from './Searchfilter';
import { Link } from 'react-router-dom';
const fetchMeals = async ({ pageParam = 0, searchValue }) => {
    console.log(searchValue);
    const searchParams = new URLSearchParams(searchValue);
    console.log(searchParams.toString());
    const res = await fetch(`https://fodecious-server.vercel.app/meals?limit=1&offset=${pageParam}&${searchParams.toString()}`);
    const data = await res.json();
    console.log({ ...data, prevOffset: pageParam });
    return { data, prevOffset: pageParam };
};

const Meals = () => {
    const [searchValue, setSearchvalue] = useState({})
    const [all, setall] = useState([])
    console.log(searchValue, "hhhhh");

    console.log(all.length);
    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, refetch } = useInfiniteQuery({
        queryKey: ['meals'],
        queryFn: ({ pageParam }) => fetchMeals({ pageParam, searchValue }),
        getNextPageParam: (lastPage) => {
            console.log(lastPage);
            if (lastPage.prevOffset > all?.length) {
                return false
            }
            return lastPage ? lastPage.prevOffset + 1 : null;
        },
    });
    useEffect(() => {
        const sub = () => {
            fetch('https://fodecious-server.vercel.app/meals')
                .then(res => res.json())
                .then(data => setall(data))
        }

        return () => {
            sub()
        }

    }, [])
    console.log(hasNextPage);
    const meals = data?.pages.flatMap((page) => page.data) || [];
    console.log(meals, "meals");

    useEffect(() => {
        // Refetch only when searchValue changes
        refetch();
    }, [searchValue, refetch]);

    useEffect(() => {
        return () => {
            // Cleanup if needed
        };
    }, [data]);
    return (

        <>
            <InfiniteScroll
                dataLength={meals.length}
                next={() => fetchNextPage()}
                hasMore={hasNextPage}
                loader={<p>Loading...</p>}
            >
                <div className="container pb-7 mx-auto">
                    <Searchfilter setSearchvalue={setSearchvalue}></Searchfilter>
                </div>

                <div className=' grid container mx-auto gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    {meals.map((meal) => (
                        <div key={meal._id} className="card w-auto bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{meal.title}</h2>
                                <p>{meal.category}</p>
                                <p className=' text-xs'>{meal.details}</p>
                                <div className="card-actions justify-end">
                                    <p className=' text-xl'>${meal.price}</p>
                                    <Link to={`/detail/${meal._id}`}>  <button className="btn btn-primary">View Details</button></Link>
                                </div>
                            </div>
                        </div>
                    ))}
                    {isFetching && !isFetchingNextPage ? 'Fetching...' : null}
                </div>
            </InfiniteScroll></>
    );
};

export default Meals;

