/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import loading from '../assets/loading.json'
import useAxiosPublic from '../Axios/useaxiosPublic';
const useMeal = () => {
    const axiosPublic = useAxiosPublic();
    const { isPending, error, data, isLoading, isFetched } = useQuery({
        queryKey: ['allmeals'],
        queryFn: async () => {
            const res = await axiosPublic.get('/meals')
            console.log(res.data);
            return res?.data
        }
    });
    console.log(data);
    return [data, isLoading, isFetched];

};

export default useMeal;
