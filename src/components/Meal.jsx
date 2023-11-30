/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const Meal = ({ meal }) => {
    const { _id, category,
        title,
        image,
        rating,
        price,
        detailsButton,
        details } = meal;
    const [value, setValue] = React.useState(rating);
    console.log(meal, "hlloo");


    return (
        <div>
            <div className="card card-compact w-[90%] h-[90%] bg-base-100 shadow-xl">
                <figure className=' relative'><img src={image} alt="Shoes" />
                    <div className="badge absolute text-f-footer top-4 right-0 bg-f-bg">{price}</div></figure>

                <div className="card-body">
                    <h2 className="card-title text-f-title">{title}</h2>
                    <div className="card-actions justify-between">
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                        <Link to={`/detail/${_id}`}> <button className=" bg-f-btn btn text-f-icon btn-sm">Details</button></Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Meal;