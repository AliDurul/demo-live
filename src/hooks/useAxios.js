import { selectAuthToken } from '@/features/authSlice';
import axios from 'axios';
import { useSelector } from 'react-redux';

const useAxios = () => {

    const token = useSelector(selectAuthToken);


    const axiosWithToken = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL,
        headers: {
            Authorization: `Token ${token}`
        }
    });

    const axiosWithoutHeader = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL
    });


    return { axiosWithToken, axiosWithoutHeader }
}

export default useAxios