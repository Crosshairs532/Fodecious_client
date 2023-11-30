/* eslint-disable react/prop-types */

import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        onSearch(searchQuery);
        console.log(searchQuery);
    };

    return (
        <div>
            <input
                className=' outline rounded-md px-2 py-2'
                type="text"
                placeholder="Search by category."
                onChange={(e) => { e.preventDefault(); onSearch(e.target.value); setSearchQuery(e.target.value) }}
            />
            <button className=' p-2 outline outline-1 outline-orange-400 text-orange-400 rounded-lg' onClick={handleSearch}>Search</button>
        </div>
    );
};
export default SearchBar;
