import { toast } from "@/components/ui/toast"
import axios from "axios"
import { useDispatch } from "react-redux"
import { cleanAuth, fillAuth, selectToken } from "./authSlice"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"


const BASE_URL = import.meta.env.VITE_BASE_URL

const useAuth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(selectToken);


    const signIn = async (userCredentials) => {

        try {
            const { data } = await axios.post(`${BASE_URL}/auth/login`, userCredentials)
            // console.log(data)

            dispatch(fillAuth(data))

            toast.add({
                title: 'Sign In Success',
                type: "success",
            });

            navigate('/stock')

        } catch (error) {
            console.log(error)
            toast.add({
                title: 'Sign In Failed',
                description: error?.response?.data?.message,
                type: "error",
            })
        }

    }

    const signUp = async (userCredentials) => {

        try {
            const { data } = await axios.post(`${BASE_URL}/users`, userCredentials)

            dispatch(fillAuth({ user: data.data, token: data.token }))

            toast.add({
                title: 'Sign In Success',
                type: "success",
            });

            navigate('/stock')

        } catch (error) {
            console.log(error)
            toast.add({
                title: 'Sign Up Failed',
                description: error?.response?.data?.message,
                type: "error",
            })
        }

    }

    const signOut = async () => {

        await new Promise(resolve => setTimeout(resolve, 2000))

        try {
            await axios(`${BASE_URL}/auth/logout`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })

            dispatch(cleanAuth())

            toast.add({
                title: 'Sign Out Success',
                type: "success",
            });

            navigate('/')

        } catch (error) {
            console.log(error)
            toast.add({
                title: 'Sign Out Failed',
                description: error?.response?.data?.message,
                type: "error",
            })
        }

    }


    return { signIn, signUp, signOut }

}

export default useAuth