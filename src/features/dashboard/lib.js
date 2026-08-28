
export const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
})

export const numberFormatter = new Intl.NumberFormat('en-US')

// Converts any unknown numeric input into a safe number.
// Output: finite number (fallback is 0).
export const getSafeNumber = (value) => {
    const parsedValue = Number(value)
    return Number.isFinite(parsedValue) ? parsedValue : 0
}

// Gets the most recent createdAt timestamp from sales + purchases.
// Output: unix timestamp in ms.
export const getReferenceTimestamp = (sales = [], purchases = []) => {
    const allTimestamps = [...sales, ...purchases]
        .map((item) => new Date(item?.createdAt).getTime())
        .filter((time) => Number.isFinite(time))

    return allTimestamps.length > 0 ? Math.max(...allTimestamps) : Date.now()
}

// Sums one numeric field (default: amount) for items inside a time window.
// Output: number (example: 12450).
export const getPeriodSum = ({ data = [], startTime, endTime, field = 'amount' }) => {
    return data.reduce((total, item) => {
        const itemTime = new Date(item?.createdAt).getTime()
        if (!Number.isFinite(itemTime) || itemTime < startTime || itemTime >= endTime) return total
        return total + getSafeNumber(item?.[field])
    }, 0)
}

// Calculates percentage change between current and previous values.
// Output: number percent (example: 12.5 means +12.5%).
export const getPercentChange = (currentValue, previousValue) => {
    if (previousValue === 0) {
        return currentValue > 0 ? 100 : 0
    }

    return ((currentValue - previousValue) / previousValue) * 100
}

export const formatPercentWithSign = (value, fractionDigits = 1) => {
    if (!Number.isFinite(value)) return '0%'
    const sign = value > 0 ? '+' : ''
    return `${sign}${value.toFixed(fractionDigits)}%`
}

export const formatPointChange = (value) => {
    if (!Number.isFinite(value)) return '0 pp'
    const sign = value > 0 ? '+' : ''
    return `${sign}${value.toFixed(1)} pp`
}

