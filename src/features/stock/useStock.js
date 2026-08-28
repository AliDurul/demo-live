import axios from "axios"
import { toast } from "@/components/ui/toast"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { selectToken } from "../auth/authSlice"
import { fetchFail, fetchStart, stockSuccess } from "./stockSlice"


const BASE_URL = import.meta.env.VITE_BASE_URL

const useStock = () => {

    const dispatch = useDispatch();
    const token = useSelector(selectToken);

    const getStock = async (url) => {
        // await new Promise(resolve => setTimeout(resolve, 2000))
        dispatch(fetchStart(url))
        try {
            const { data } = await axios(`${BASE_URL}/${url}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })

            dispatch(stockSuccess({ url, data: data.data }))

        } catch (error) {
            console.log(error)
            dispatch(fetchFail({ url, error: error?.response?.data?.message }))
            toast.add({
                title: 'Firms Failed',
                description: error?.response?.data?.message,
                type: "error",
            })
        }

    }

    const getStockResources = async (resources = []) => {
        if (!Array.isArray(resources) || resources.length === 0) return

        await Promise.all(resources.map(resource => getStock(resource)))

    }

    const getStockById = async (url, id) => {
        try {
            const { data } = await axios(`${BASE_URL}/${url}/${id}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })

            return { data: data.data }

        } catch (error) {
            console.log(error)
            toast.add({
                title: `${url}  Failed`,
                description: error?.response?.data?.message,
                type: "error",
            })
        }

    }

    const createStock = async (url, formData) => {
        try {

            await axios.post(`${BASE_URL}/${url}`, formData, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })

            await getStock(url)

            toast.add({
                title: `${url} create Success`,
                type: "success",
            });

        } catch (error) {
            console.log(error)
            toast.add({
                title: `${url} creation failed`,
                description: error?.response?.data?.message,
                type: "error",
            })
        }

    }

    const deleteStock = async (url, id) => {
        try {
            await axios.delete(`${BASE_URL}/${url}/${id}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })

            await getStock(url)

            toast.add({
                title: `${url} delete Success`,
                type: "success",
            });

        } catch (error) {
            console.log(error)
            toast.add({
                title: `${url} deletion failed`,
                description: error?.response?.data?.message,
                type: "error",
            })
        }

    }

    const updateStock = async (url, id, formData) => {
        try {
            await axios.put(`${BASE_URL}/${url}/${id}`, formData, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })

            await getStock(url)

            toast.add({
                title: `${url} update success`,
                type: "success",
            });

        } catch (error) {
            console.log(error)
            toast.add({
                title: `${url} update failed`,
                description: error?.response?.data?.message,
                type: "error",
            })
        }

    }

    return { getStock, createStock, getStockById, deleteStock, updateStock, getStockResources }

}

export default useStock