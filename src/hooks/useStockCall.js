import { fetchFail, fetchStart, getSuccess } from "@/features/stockSlice"
import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { toast } from "sonner"
import useAxios from "./useAxios"

const useStockCall = () => {
    const dispatch = useDispatch()
    const { axiosWithToken } = useAxios()

    const getErrorMessage = (error) => {
        return (
            error?.response?.data?.message ||
            error?.response?.data?.detail ||
            error?.message ||
            "Something went wrong"
        )
    }

    const formatResourceName = (url) => {
        if (!url) return "Data"
        return url.charAt(0).toUpperCase() + url.slice(1)
    }

    const getStockData = useCallback(async (url) => {
        await new Promise(resolve => setTimeout(resolve, 2000))

        try {
            dispatch(fetchStart(url))
            const { data } = await axiosWithToken(`${url}?sort[createdAt]=desc`)
            // throw new Error("Test error handling")
            dispatch(getSuccess({ data: data.data, url }))
        } catch (error) {
            const errorMessage = getErrorMessage(error)
            dispatch(fetchFail({ error: errorMessage, url }))
            console.log(error);
            toast.error(`${formatResourceName(url)} could not be loaded`, {
                description: errorMessage,
            })
        }
    }, [axiosWithToken, dispatch])

    const getStockResources = useCallback(async (resources = []) => {
        if (!Array.isArray(resources) || resources.length === 0) return

        await Promise.all(
            resources.map((resource) => getStockData(resource))
        )
    }, [getStockData])

    const getStockDataById = useCallback(async (url, id) => {
        try {
            const { data } = await axiosWithToken(`${url}/${id}`)

            return { success: true, data: data.data }
        } catch (error) {
            const errorMessage = getErrorMessage(error)
            toast.error(`${formatResourceName(url)} could not be loaded`, {
                description: errorMessage,
            })

            return { success: false, error: errorMessage }
        }
    }, [axiosWithToken])

    const updateStockData = useCallback(async (url, id, updateInfo) => {
        try {
            dispatch(fetchStart(url))

            await axiosWithToken.put(`${url}/${id}`, updateInfo)
            toast.success("Updated successfully")
            await getStockData(url)
            return true
        } catch (error) {
            const errorMessage = getErrorMessage(error)
            dispatch(fetchFail({ error: errorMessage, url }))
            console.log(error)
            toast.error("Update failed", {
                description: errorMessage,
            })
            return false
        }
    }, [axiosWithToken, dispatch, getStockData])

    const createStockData = useCallback(async (url, createdInfo) => {
        try {
            await axiosWithToken.post(`${url}`, createdInfo)
            toast.success("Created  successfully")
            await getStockData(url)
            return true
        } catch (error) {
            const errorMessage = getErrorMessage(error)
            dispatch(fetchFail({ error: errorMessage, url }))
            console.log(error)
            toast.error("Create failed", {
                description: errorMessage,
            })
            return false
        }
    }, [axiosWithToken, dispatch, getStockData])

    const deleteStockData = useCallback(async (url, id) => {
        try {
            dispatch(fetchStart(url))
            await axiosWithToken.delete(`${url}/${id}`)
            toast.success("Deleted successfully")
            await getStockData(url)
        } catch (error) {
            const errorMessage = getErrorMessage(error)
            dispatch(fetchFail({ error: errorMessage, url }))
            console.log(error)
            toast.error("Delete failed", {
                description: errorMessage,
            })
        }
    }, [axiosWithToken, dispatch, getStockData])


    return { getStockData, getStockResources, getStockDataById, updateStockData, deleteStockData, createStockData, }
}

export default useStockCall