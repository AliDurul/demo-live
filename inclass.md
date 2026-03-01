- revise prev session's code
- update the sidebar's nav items to point to the correct url
- add a new page for the dashboard home and link it to the sidebar
- in dashboard home
    - create dashboardHome Cards 
    ```jsx
    <div className=" grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 xl:grid-cols-4">
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total Revenue</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        $1,250.00
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <TrendingUp />
                            +12.5%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Trending up this month <TrendingUp className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        Visitors for the last 6 months
                    </div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>New Customers</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        1,234
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <TrendingDown />
                            -20%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Down 20% this period <TrendingDown className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        Acquisition needs attention
                    </div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Active Accounts</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        45,678
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <TrendingUp />
                            +12.5%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Strong user retention <TrendingUp className="size-4" />
                    </div>
                    <div className="text-muted-foreground">Engagement exceed targets</div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Growth Rate</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        4.5%
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <TrendingUp />
                            +4.5%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Steady performance increase <TrendingUp className="size-4" />
                    </div>
                    <div className="text-muted-foreground">Meets growth projections</div>
                </CardFooter>
            </Card>
        </div>
    ```
    - create dashboardHome Area Chart from shadcn chart exp
    ```jsx
            "use client"

        import * as React from "react"
        import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

        import {
        Card,
        CardContent,
        CardDescription,
        CardHeader,
        CardTitle,
        } from "@/components/ui/card"
        import {
        ChartContainer,
        ChartLegend,
        ChartLegendContent,
        ChartTooltip,
        ChartTooltipContent,
        } from "@/components/ui/chart"
        import {
        Select,
        SelectContent,
        SelectItem,
        SelectTrigger,
        SelectValue,
        } from "@/components/ui/select"

        export const description = "An interactive area chart"

        
        const chartConfig = {
        visitors: {
            label: "Visitors",
        },
        desktop: {
            label: "Desktop",
            color: "var(--chart-1)",
        },
        mobile: {
            label: "Mobile",
            color: "var(--chart-2)",
        },
        }

        export default function DashboardHomeAreaChart() {
        const [timeRange, setTimeRange] = React.useState("90d")

        const filteredData = chartData.filter((item) => {
            const date = new Date(item.date)
            const referenceDate = new Date("2024-06-30")
            let daysToSubtract = 90
            if (timeRange === "30d") {
            daysToSubtract = 30
            } else if (timeRange === "7d") {
            daysToSubtract = 7
            }
            const startDate = new Date(referenceDate)
            startDate.setDate(startDate.getDate() - daysToSubtract)
            return date >= startDate
        })

        return (
            <Card className="pt-0">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                <CardTitle>Area Chart - Interactive</CardTitle>
                <CardDescription>
                    Showing total visitors for the last 3 months
                </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger
                    className="hidden w-40 rounded-lg sm:ml-auto sm:flex"
                    aria-label="Select a value"
                >
                    <SelectValue placeholder="Last 3 months" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                    <SelectItem value="90d" className="rounded-lg">
                    Last 3 months
                    </SelectItem>
                    <SelectItem value="30d" className="rounded-lg">
                    Last 30 days
                    </SelectItem>
                    <SelectItem value="7d" className="rounded-lg">
                    Last 7 days
                    </SelectItem>
                </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                config={chartConfig}
                className="aspect-auto h-62.5 w-full"
                >
                <AreaChart data={filteredData}>
                    <defs>
                    <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                        <stop
                        offset="5%"
                        stopColor="var(--color-desktop)"
                        stopOpacity={0.8}
                        />
                        <stop
                        offset="95%"
                        stopColor="var(--color-desktop)"
                        stopOpacity={0.1}
                        />
                    </linearGradient>
                    <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                        <stop
                        offset="5%"
                        stopColor="var(--color-mobile)"
                        stopOpacity={0.8}
                        />
                        <stop
                        offset="95%"
                        stopColor="var(--color-mobile)"
                        stopOpacity={0.1}
                        />
                    </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} />
                    <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={(value) => {
                        const date = new Date(value)
                        return date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        })
                    }}
                    />
                    <ChartTooltip
                    cursor={false}
                    content={
                        <ChartTooltipContent
                        labelFormatter={(value) => {
                            return new Date(value).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            })
                        }}
                        indicator="dot"
                        />
                    }
                    />
                    <Area
                    dataKey="mobile"
                    type="natural"
                    fill="url(#fillMobile)"
                    stroke="var(--color-mobile)"
                    stackId="a"
                    />
                    <Area
                    dataKey="desktop"
                    type="natural"
                    fill="url(#fillDesktop)"
                    stroke="var(--color-desktop)"
                    stackId="a"
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                </AreaChart>
                </ChartContainer>
            </CardContent>
            </Card>
        )
        }

    ```

    - add fetching data 
    ```jsx
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

    return (
        <section className='space-y-5 pt-3 px-4 lg:px-6'>
            {
                showSalesLoadingSkeleton ? <DashboardHomeCardsSkeleton /> : <DashboardHomeCards />
            }
            {
                showPurchaseLoadingSkeleton ? <DashboardHomeAreaChartSkeleton /> : <DashboardHomeAreaChart />
            }
        </section>
    )
    }
    ```

    - update cards
    ```jsx
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


    const getSafeNumber = (value) => {
        const parsedValue = Number(value)
        return Number.isFinite(parsedValue) ? parsedValue : 0
    }


    const getReferenceTimestamp = (sales = [], purchases = []) => {
        const allTimestamps = [...sales, ...purchases]
            .map((item) => new Date(item?.createdAt).getTime())
            .filter((time) => Number.isFinite(time))

        return allTimestamps.length > 0 ? Math.max(...allTimestamps) : Date.now()
    }


    const getPeriodSum = ({ data = [], startTime, endTime, field = 'amount' }) => {
        return data.reduce((total, item) => {
            const itemTime = new Date(item?.createdAt).getTime()
            if (!Number.isFinite(itemTime) || itemTime < startTime || itemTime >= endTime) return total
            return total + getSafeNumber(item?.[field])
        }, 0)
    }


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
                            Last 7 days vs previous 7 days {trends.salesChange >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
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
                            Last 7 days vs previous 7 days {trends.purchaseChange >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
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
                            Last 7 days vs previous 7 days {trends.grossChange >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
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
                            Last 7 days vs previous 7 days {trends.marginPointChange >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
                        </div>
                        <div className="text-muted-foreground">Gross profit divided by sales revenue</div>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    ```


    - update area chart
    ```jsx
    import * as React from "react"
    import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

    import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    } from "@/components/ui/card"
    import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    } from "@/components/ui/chart"
    import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    } from "@/components/ui/select"

    export const description = "An interactive area chart"

    const getSafeNumber = (value) => {
    const parsedValue = Number(value)
    return Number.isFinite(parsedValue) ? parsedValue : 0
    }

    const toDateKey = (value) => {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return null
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
    }

    const getDaysFromRange = (timeRange) => {
    if (timeRange === "30d") return 30
    if (timeRange === "7d") return 7
    return 90
    }

    const chartConfig = {
    sales: {
        label: "Sales",
        color: "var(--chart-1)",
    },
    purchases: {
        label: "Purchases",
        color: "var(--chart-2)",
    },
    }

    export default function DashboardHomeAreaChart({ sales = [], purchases = [] }) {
    const [timeRange, setTimeRange] = React.useState("90d")
    const amountFormatter = React.useMemo(
        () => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }),
        []
    )

    const dailyTotals = React.useMemo(() => {
        const mergedByDate = {}

        sales.forEach((sale) => {
        const dateKey = toDateKey(sale?.createdAt)
        if (!dateKey) return

        if (!mergedByDate[dateKey]) {
            mergedByDate[dateKey] = { date: dateKey, sales: 0, purchases: 0 }
        }

        mergedByDate[dateKey].sales += getSafeNumber(sale?.amount)
        })

        purchases.forEach((purchase) => {
        const dateKey = toDateKey(purchase?.createdAt)
        if (!dateKey) return

        if (!mergedByDate[dateKey]) {
            mergedByDate[dateKey] = { date: dateKey, sales: 0, purchases: 0 }
        }

        mergedByDate[dateKey].purchases += getSafeNumber(purchase?.amount)
        })

        return mergedByDate
    }, [sales, purchases])

    const filteredData = React.useMemo(() => {
        const daysToShow = getDaysFromRange(timeRange)
        const allTimestamps = [...sales, ...purchases]
        .map((item) => new Date(item?.createdAt).getTime())
        .filter((time) => Number.isFinite(time))

        const referenceDate = allTimestamps.length > 0 ? new Date(Math.max(...allTimestamps)) : new Date()
        referenceDate.setHours(0, 0, 0, 0)

        const rangeData = []

        for (let index = daysToShow - 1; index >= 0; index -= 1) {
        const currentDate = new Date(referenceDate)
        currentDate.setDate(referenceDate.getDate() - index)

        const key = toDateKey(currentDate)
        if (!key) continue

        const existing = dailyTotals[key] || { sales: 0, purchases: 0 }
        rangeData.push({
            date: key,
            sales: getSafeNumber(existing.sales),
            purchases: getSafeNumber(existing.purchases),
        })
        }

        return rangeData
    }, [dailyTotals, purchases, sales, timeRange])

    return (
        <Card className="pt-0">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
            <div className="grid flex-1 gap-1">
            <CardTitle>Sales & Purchases</CardTitle>
            <CardDescription>
                Showing daily totals for the selected range
            </CardDescription>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
                className="hidden w-40 rounded-lg sm:ml-auto sm:flex"
                aria-label="Select a value"
            >
                <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
                <SelectItem value="90d" className="rounded-lg">
                Last 3 months
                </SelectItem>
                <SelectItem value="30d" className="rounded-lg">
                Last 30 days
                </SelectItem>
                <SelectItem value="7d" className="rounded-lg">
                Last 7 days
                </SelectItem>
            </SelectContent>
            </Select>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
            <ChartContainer
            config={chartConfig}
            className="aspect-auto h-62.5 w-full"
            >
            <AreaChart data={filteredData}>
                <defs>
                <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                    <stop
                    offset="5%"
                    stopColor="var(--color-sales)"
                    stopOpacity={0.8}
                    />
                    <stop
                    offset="95%"
                    stopColor="var(--color-sales)"
                    stopOpacity={0.1}
                    />
                </linearGradient>
                <linearGradient id="fillPurchases" x1="0" y1="0" x2="0" y2="1">
                    <stop
                    offset="5%"
                    stopColor="var(--color-purchases)"
                    stopOpacity={0.8}
                    />
                    <stop
                    offset="95%"
                    stopColor="var(--color-purchases)"
                    stopOpacity={0.1}
                    />
                </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                    const date = new Date(value)
                    return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    })
                }}
                />
                <ChartTooltip
                cursor={false}
                content={
                    <ChartTooltipContent
                    formatter={(value, name, item) => {
                        const seriesLabel = chartConfig?.[name]?.label || name
                        const indicatorColor = item?.color || item?.payload?.fill || "var(--muted-foreground)"

                        return (
                        <div className="flex w-full items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                            <span
                                className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                                style={{ backgroundColor: indicatorColor }}
                            />
                            <span className="text-muted-foreground">{seriesLabel}</span>
                            </div>
                            <span className="text-foreground font-mono font-medium tabular-nums">
                            {amountFormatter.format(getSafeNumber(value))}
                            </span>
                        </div>
                        )
                    }}
                    labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        })
                    }}
                    indicator="dot"
                    />
                }
                />
                <Area
                dataKey="purchases"
                type="natural"
                fill="url(#fillPurchases)"
                stroke="var(--color-purchases)"
                stackId="a"
                />
                <Area
                dataKey="sales"
                type="natural"
                fill="url(#fillSales)"
                stroke="var(--color-sales)"
                stackId="a"
                />
                <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
            </ChartContainer>
        </CardContent>
        </Card>
    )
    }
```