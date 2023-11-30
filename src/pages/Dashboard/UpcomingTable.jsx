/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import Swal from "sweetalert2";
import useAxiosSecure from "../../Axios/useaxiosSecure";


const UpcomingTable = ({ item, index }) => {
    const axiosSecure = useAxiosSecure();
    const handlePublish = async () => {
        console.log(item);
        const item1 = { category: item.category, count: item.count, details: item.details, distributorEmail: item.distributorEmail, distributorName: item.distributorName, image: item.image, ingredients: item.ingredients, postTime: item.postTime, price: item.price, rating: item.rating, rcount: item.rcount, title: item.title }

        const MealPublish = await axiosSecure.post(`/admin/upcoming`, item1);
        console.log(MealPublish);
        if (MealPublish.data.insertedId) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${item.title} published`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{item.title}</td>
            <td>{item.category}</td>
            <td>{item.count}</td>
            <td>{item.distributorName}</td>
            <td>
                <button onClick={handlePublish} className={`btn ${item.count >= 10 ? ' bg-f-green text-f-bg' : ' bg-f-icon'}`}>Publish</button>
            </td>
        </tr>

    );
};

export default UpcomingTable;