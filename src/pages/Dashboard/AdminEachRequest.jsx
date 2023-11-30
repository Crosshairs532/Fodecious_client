/* eslint-disable react/prop-types */

import Swal from "sweetalert2";
import useAxiosSecure from "../../Axios/useaxiosSecure";

const AdminEachRequest = ({ item, index, refetch }) => {
    const axiosSecure = useAxiosSecure();

    const handleDeliver = async () => {
        const Updated = await axiosSecure.patch(`/admin/Status?id=${item._id}`)
        if (Updated.data.modifiedCount > 0) {

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${item.title} delivered`,
                showConfirmButton: false,
                timer: 1500
            });
            refetch()

        }
    }
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{item.title}</td>
            <td className=" flex flex-col"><h1 className=" font-Nunito font-extrabold text-lg">{item.username}</h1><p className=" text-xs">{item.email}</p></td>
            <td>
                <button className="  font-Nunito font-medium">{item.status}</button>
            </td>
            <td>
                <button onClick={handleDeliver} className=" btn bg-f-error text-f-bg font-Nunito font-medium shadow-md shadow-neutral-500">Deliver</button>
            </td>
        </tr>
    );
};

export default AdminEachRequest;