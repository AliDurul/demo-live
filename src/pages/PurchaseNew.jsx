import PurchaseForm from '@/components/PurchaseForm'
import React from 'react'

export default function PurchaseNew() {
    return (
        <div className='rounded-md border'>
            <div className="flex h-full flex-1 flex-col gap-8 p-8">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                            New Purchase
                        </h2>
                        <p className="text-muted-foreground">
                            Create a new purchase transaction by selecting the firm, brand, product, quantity, and price.
                        </p>
                    </div>
                </div>
                    <PurchaseForm />
            </div>
        </div>
    )
}
