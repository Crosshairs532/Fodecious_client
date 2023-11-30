/* eslint-disable react/prop-types */
import { TextField } from "@mui/material";
// import { Box } from "@mui/system";
// import { useState } from "react";
// import useSearch from "../../Hooks/useSearch";


const SearchUser = ({ handleSearch }) => {

    return (
        <div className=" flex flex-col md:flex-row lg:flex-row gap-2">

            <form className=" flex flex-col p-3 lg:p-0 md:p-0 mg:flex-row lg:flex-row gap-2" onSubmit={handleSearch} action="">
                <TextField
                    id="outlined-multiline-flexible"
                    label=" search by name..."
                    multiline
                    name="name"
                    type='text'
                    style={{ backgroundColor: '#FFE7D5ff', color: '#6C4C4Cff' }}
                    maxRows={3}
                />
                <TextField
                    id="outlined-multiline-flexible"
                    label="Search by Email.."
                    multiline
                    type="email"
                    name="email"
                    maxRows={4}
                />

                <button className=" btn bg-f-footer text-f-icon  font-Nunito text-lg" type="submit">Search</button>
            </form>
        </div>
    );
};

export default SearchUser;