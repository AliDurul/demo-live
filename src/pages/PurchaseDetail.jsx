import React from 'react'
import { useParams } from 'react-router-dom'

export default function PurchaseDetail() {
    const { id } = useParams()
    return (
        <div>PurchaseDetail {id}</div>
    )
}
