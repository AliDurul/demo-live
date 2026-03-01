import { useEffect, useMemo } from "react"

export default function useEnsureStockResources({ open, resources, fetchResources }) {
    const idleResources = useMemo(
        () => resources.filter((resource) => resource.status === 'idle').map((resource) => resource.name),
        [resources]
    )

    useEffect(() => {
        if (!open) return
        if (idleResources.length === 0) return

        fetchResources(idleResources)
    }, [open, idleResources, fetchResources])
}
