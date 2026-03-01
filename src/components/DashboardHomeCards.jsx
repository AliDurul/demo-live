import React from 'react'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { TrendingUp } from 'lucide-react'
import { TrendingDown } from 'lucide-react'

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
})

const numberFormatter = new Intl.NumberFormat('en-US')

// Converts any unknown numeric input into a safe number.
// Output: finite number (fallback is 0).
const getSafeNumber = (value) => {
    const parsedValue = Number(value)
    return Number.isFinite(parsedValue) ? parsedValue : 0
}

// Gets the most recent createdAt timestamp from sales + purchases.
// Output: unix timestamp in ms.
const getReferenceTimestamp = (sales = [], purchases = []) => {
    const allTimestamps = [...sales, ...purchases]
        .map((item) => new Date(item?.createdAt).getTime())
        .filter((time) => Number.isFinite(time))

    return allTimestamps.length > 0 ? Math.max(...allTimestamps) : Date.now()
}

// Sums one numeric field (default: amount) for items inside a time window.
// Output: number (example: 12450).
const getPeriodSum = ({ data = [], startTime, endTime, field = 'amount' }) => {
    return data.reduce((total, item) => {
        const itemTime = new Date(item?.createdAt).getTime()
        if (!Number.isFinite(itemTime) || itemTime < startTime || itemTime >= endTime) return total
        return total + getSafeNumber(item?.[field])
    }, 0)
}

// Calculates percentage change between current and previous values.
// Output: number percent (example: 12.5 means +12.5%).
const getPercentChange = (currentValue, previousValue) => {
    if (previousValue === 0) {
        return currentValue > 0 ? 100 : 0
    }

    return ((currentValue - previousValue) / previousValue) * 100
}

const formatPercentWithSign = (value, fractionDigits = 1) => {
    if (!Number.isFinite(value)) return '0%'
    const sign = value > 0 ? '+' : ''
    return `${sign}${value.toFixed(fractionDigits)}%`
}

const formatPointChange = (value) => {
    if (!Number.isFinite(value)) return '0 pp'
    const sign = value > 0 ? '+' : ''
    return `${sign}${value.toFixed(1)} pp`
}

const TrendBadge = ({ value, formatValue = formatPercentWithSign }) => {
    const TrendIcon = value >= 0 ? TrendingUp : TrendingDown

    return (
        <Badge variant="outline">
            <TrendIcon />
            {formatValue(value)}
        </Badge>
    )
}

/**
 * Dashboard overview cards based on sales and purchase transactions.
 *
 * Expected props data shape:
 * sales/purchases: [{ amount: number, quantity: number, createdAt: string, ... }]
 *
 * Calculated output:
 * totals => {
 *   totalSalesRevenue: number,
 *   totalPurchaseCost: number,
 *   grossProfit: number,
 *   profitMargin: number
 * }
 * trends => {
 *   salesChange: number,
 *   purchaseChange: number,
 *   grossChange: number,
 *   marginPointChange: number
 * }
 */
export default function DashboardHomeCards({ sales = [], purchases = [] }) {
    const totals = React.useMemo(() => {
        const totalSalesRevenue = sales.reduce((sum, sale) => sum + sale?.amount, 0)
        const totalPurchaseCost = purchases.reduce((sum, purchase) => sum + purchase?.amount, 0)
        const grossProfit = totalSalesRevenue - totalPurchaseCost
        const profitMargin = totalSalesRevenue > 0 ? (grossProfit / totalSalesRevenue) * 100 : 0

        return {
            totalSalesRevenue,
            totalPurchaseCost,
            grossProfit,
            profitMargin,
        }
    }, [sales, purchases])

    const trends = React.useMemo(() => {
        const dayInMs = 24 * 60 * 60 * 1000
        const periodInMs = 7 * dayInMs
        const referenceTime = getReferenceTimestamp(sales, purchases)

        const currentStart = referenceTime - periodInMs
        const previousStart = currentStart - periodInMs

        const currentSales = getPeriodSum({ data: sales, startTime: currentStart, endTime: referenceTime })
        const previousSales = getPeriodSum({ data: sales, startTime: previousStart, endTime: currentStart })

        const currentPurchases = getPeriodSum({ data: purchases, startTime: currentStart, endTime: referenceTime })
        const previousPurchases = getPeriodSum({ data: purchases, startTime: previousStart, endTime: currentStart })

        const currentGross = currentSales - currentPurchases
        const previousGross = previousSales - previousPurchases

        const currentMargin = currentSales > 0 ? (currentGross / currentSales) * 100 : 0
        const previousMargin = previousSales > 0 ? (previousGross / previousSales) * 100 : 0

        return {
            salesChange: getPercentChange(currentSales, previousSales),
            purchaseChange: getPercentChange(currentPurchases, previousPurchases),
            grossChange: getPercentChange(currentGross, previousGross),
            marginPointChange: currentMargin - previousMargin,
        }
    }, [sales, purchases])

    return (
        <div className=" grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total Sales Revenue</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {currencyFormatter.format(totals.totalSalesRevenue)}
                    </CardTitle>
                    <CardAction>
                        <TrendBadge value={trends.salesChange} />
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Last 7 vs previous 7 days {trends.salesChange >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
                    </div>
                    <div className="text-muted-foreground">
                        {numberFormatter.format(sales.length)} sales transactions
                    </div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total Purchase Cost</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {currencyFormatter.format(totals.totalPurchaseCost)}
                    </CardTitle>
                    <CardAction>
                        <TrendBadge value={trends.purchaseChange} />
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Last 7 vs previous 7 days {trends.purchaseChange >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
                    </div>
                    <div className="text-muted-foreground">
                        {numberFormatter.format(purchases.length)} purchase transactions
                    </div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Gross Profit</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {currencyFormatter.format(totals.grossProfit)}
                    </CardTitle>
                    <CardAction>
                        <TrendBadge value={trends.grossChange} />
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Last 7 vs previous 7 days {trends.grossChange >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
                    </div>
                    <div className="text-muted-foreground">Sales revenue minus purchase cost</div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Profit Margin</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {totals.profitMargin.toFixed(1)}%
                    </CardTitle>
                    <CardAction>
                        <TrendBadge value={trends.marginPointChange} formatValue={formatPointChange} />
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Last 7 vs previous 7 days {trends.marginPointChange >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
                    </div>
                    <div className="text-muted-foreground">Gross profit divided by sales revenue</div>
                </CardFooter>
            </Card>
        </div>
    )
}
