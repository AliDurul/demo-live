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
