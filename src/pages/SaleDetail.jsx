import React from 'react'
import { useParams } from 'react-router-dom'

export default function SaleDetail() {
    const { id } = useParams()
    return (
        <div>SaleDetail {id}</div>
    )
}
