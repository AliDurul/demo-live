import { cleanAuth, fillAuth } from "@/features/authSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useAxios from "./useAxios"

const BASE_URL = import.meta.env.VITE_BASE_URL;
const useAuthCall = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { axiosWithoutHeader, axiosWithToken } = useAxios()

    const signIn = async (userCredentials) => {

        try {
            console.log(userCredentials);
            const { data } = await axiosWithoutHeader.post(`auth/login/`, userCredentials);
            console.log(data);

            dispatch(fillAuth(data));

            toast.success("Login successful!", {
                description: `Welcome back, ${data.user.username}!`,
            });

            navigate("/stock");

        } catch (error) {
            toast.error("Login failed", {
                description: error.response?.data?.message || error.message || "Please check your credentials",
            });
        }
    };

    const signUp = async (userCredentials) => {

        try {
            await new Promise((res) => setTimeout(res, 1500));
            const { data } = await axiosWithoutHeader.post(`users/`, userCredentials);

            dispatch(fillAuth(data));

            toast.success("Registration successful!", {
                description: `Welcome, ${data.data.username}!`,
            });

            navigate("/stock");

        } catch (error) {
            console.log(error);
            toast.error("Sign up failed", {
                description: error.response?.data?.message || error.message || "Please try again later",
            });
        }
    };

    const signOut = async () => {

        await new Promise((res) => setTimeout(res, 1500));

        try {
            await axiosWithToken(`/auth/logout`);
            dispatch(cleanAuth());
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Sign out failed", {
                description: error.response?.data?.message || error.message || "Please try again later",
            });
        }
    };

    return { signIn, signUp, signOut };
};

export default useAuthCall;