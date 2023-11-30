import axios from 'axios'
const axiosPublic = axios.create({
    baseURL: 'https://fodecious-server.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;