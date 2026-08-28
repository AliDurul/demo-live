
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { TrendingDown } from "lucide-react"
import { TrendingUp } from "lucide-react"
import { useMemo } from "react"
import { currencyFormatter, formatPercentWithSign, formatPointChange, getPercentChange, getPeriodSum, getReferenceTimestamp, numberFormatter } from "../lib"


export const TrendBadge = ({ value, formatValue = formatPercentWithSign }) => {
    const TrendIcon = value >= 0 ? TrendingUp : TrendingDown

    return (
        <Badge variant="outline">
            <TrendIcon />
            {formatValue(value)}
        </Badge>
    )
}

export function SectionCards({ sales, purchases }) {

    const totals = useMemo(() => {
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

    const trends = useMemo(() => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs  dark:*:data-[slot=card]:bg-card">
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
