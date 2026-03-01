import DashboardHomeAreaChart from '@/components/DashboardHomeAreaChart'
import DashboardHomeCards from '@/components/DashboardHomeCards'
import { DashboardHomeAreaChartSkeleton, DashboardHomeCardsSkeleton } from '@/components/shared/Skeletons'
import { selectPurchases, selectPurchasesStatus, selectSales, selectSalesStatus } from '@/features/stockSlice'
import useEnsureStockResources from '@/hooks/useEnsureStockResources'
import useStockCall from '@/hooks/useStockCall'
import React from 'react'
import { useSelector } from 'react-redux'

export default function DashboardHome() {
    const sales = useSelector(selectSales)
    const purchases = useSelector(selectPurchases)
    const salesStatus = useSelector(selectSalesStatus)
    const purchaseStatus = useSelector(selectPurchasesStatus)
    const { getStockResources } = useStockCall();

    const requiredResources = [
        { name: 'sales', status: salesStatus },
        { name: 'purchases', status: purchaseStatus },
    ]

    useEnsureStockResources({
        open: true,
        resources: requiredResources,
        fetchResources: getStockResources,
    })

    const showSalesLoadingSkeleton = salesStatus === 'idle' || (salesStatus === 'loading' && sales.length === 0)
    const showPurchaseLoadingSkeleton = purchaseStatus === 'idle' || (purchaseStatus === 'loading' && purchases.length === 0)
    const showLoadingSkeleton = showSalesLoadingSkeleton || showPurchaseLoadingSkeleton

    return (
        <section className='space-y-5 pt-3 px-4 lg:px-6'>
            {
                showLoadingSkeleton ? <>
                    <DashboardHomeCardsSkeleton />
                    <DashboardHomeAreaChartSkeleton />
                </> : <>
                    <DashboardHomeCards sales={sales} purchases={purchases} />
                    <DashboardHomeAreaChart sales={sales} purchases={purchases} />
                </>
            }
        </section>
    )
}
