import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setTheme } from "@/features/themeSlice"

export function useTheme() {
    const theme = useSelector((state) => state.theme.theme)
    const dispatch = useDispatch()

    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove("light", "dark")

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light"

            root.classList.add(systemTheme)
            return
        }

        root.classList.add(theme)
    }, [theme])

    return {
        theme,
        setTheme: (newTheme) => dispatch(setTheme(newTheme)),
    }
}
