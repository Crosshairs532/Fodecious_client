/* eslint-disable react/prop-types */
import { useState } from 'react';

const Searchfilter = ({ setSearchvalue, refetch }) => {
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = () => {

        const searchParams = {
            searchval: searchInput,
        };

        setSearchvalue(searchParams);

    };

    return (
        <div>
            <h1 className=' font-Nunito mt-5'>Search by Title, Category or Price</h1>
            <div className="search-container">
                <input className=' bg-f-icon w-[300px] text-f-btn py-3 px-4'
                    type="text"

                    placeholder="Search by title, category and specific price..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button className=' bg-f-btn rounded-md text-f-bg p-3 font-Nunito text-xl' onClick={handleSearch}>Search</button>
            </div>
        </div>
    );
};

export default Searchfilter;
