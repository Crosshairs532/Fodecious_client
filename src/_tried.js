
// const Meals = () => {
//     const {
//         data,
//         fetchNextPage,
//         hasNextPage,
//         isFetching,
//         isFetchingNextPage,
//     } = useInfiniteQuery({
//         queryKey: ['meals'],
//         queryFn: fetchMeals,
//         getNextPageParam: (lastPage) => lastPage.data.prevOffset + 2,
//     });
//     console.log(data?.pages[0]?.data, "h");
//     const meals = data?.pages[0]?.data?.flatMap((page) => page) || [];

//     useEffect(() => {
//         // You can add any additional cleanup or logic here
//         return () => {
//             // Cleanup, if needed
//         };
//     }, [data]);
//     console.log(meals);
//     return (
//         <InfiniteScroll
//             dataLength={meals.length}
//             next={() => fetchNextPage()}
//             hasMore={hasNextPage}
//             loader={<p>Loading...</p>}
//         >
//             {meals?.map((meal, idx) => (

//                 // <div key={idx}>
//                 //     <p>hhhhh</p>
//                 //     <h2>{meal?.title}</h2>
//                 //     <p>{meal?.details}</p>
//                 //     {/* Add more details as needed */}
//                 // </div>
//                 <>
//                     <div className="card w-96 bg-base-100 shadow-xl">
//                         <div className="card-body">
//                             <h2 className="card-title">Card title!</h2>
//                             <p>If a dog chews shoes whose shoes does he choose?</p>
//                             <div className="card-actions justify-end">
//                                 <button className="btn btn-primary">Buy Now</button>
//                             </div>
//                         </div>
//                     </div>
//                 </>
//             ))}
//             {isFetching && !isFetchingNextPage ? 'Fetching...' : null}
//         </InfiniteScroll>
//     );
// };

// export default Meals;