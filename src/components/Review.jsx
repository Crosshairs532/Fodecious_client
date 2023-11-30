/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Rating } from "@mui/material";
import { useState } from "react";


const Review = ({ review }) => {
    const [value, setValue] = useState(review.rating);
    // console.log(review, "rebviw");
    const { comment, rating, username } = review;
    return (
        <div>
            <div className="card w-96 mr-2 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{username}</h2>
                    <p>{comment}</p>
                    <div className="card-actions justify-end">
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, rating) => {
                                setValue(rating);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div >
    )
};

export default Review;