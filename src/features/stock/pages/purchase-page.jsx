import { useSelector } from "react-redux";
import {selectPurchases, selectPurchasesStatus } from "../stockSlice";
import useStock from "../useStock";
import { useEffect } from "react";
import { DataTable } from "@/components/shared/table/data-table";
import { purchaseColumns } from "@/components/shared/table/column";
import { TableSkeleton } from "@/components/shared/Skeletons";
import { useState } from "react";
import { PurchaseModal } from "../components/purchase-modal";


export default function PurchasePage() {

    const { getStock } = useStock();
    const [open, setOpen] = useState(false);
    const [selectedPurchase, setSelectedPurchase] = useState(null)
    const purchases = useSelector(selectPurchases);
    const purchasesStatus = useSelector(selectPurchasesStatus);
    const isLoading = purchasesStatus === 'idle' || (purchasesStatus === 'loading' && purchases.length === 0);

    const handleModalChange = (isOpen) => {
        setOpen(isOpen)
        if (!isOpen) {
            setSelectedPurchase(null)
        }
    }

    const handleEdit = (sale) => {

        setOpen(true)
        setSelectedPurchase({
            _id: sale._id,
            firmId: sale?.firmId?._id,
            brandId: sale?.brandId?._id,
            productId: sale?.productId?._id,
            quantity: sale.quantity,
            price: sale.price
        })
    }

    useEffect(() => {
        getStock('purchases')
    }, [])

    return (
        <section className='space-y-4 p-4'>

            {
                isLoading
                    ? <TableSkeleton />
                    : (
                        <div className='rounded-md border flex flex-col gap-8 p-8'>
                            <div className="flex flex-col gap-1">
                                <h2 className="text-2xl font-semibold tracking-tight">Purchases</h2>
                                <p className="text-muted-foreground">Track and manage all purchases transactions by firm, brand, product, quantity and amount.</p>
                            </div>

                            <DataTable
                                columns={purchaseColumns(handleEdit)}
                                data={purchases}
                                onOpenModal={() => handleModalChange(true)}
                            />
                        </div>
                    )
            }

            <PurchaseModal open={open} onOpenChange={handleModalChange} selectedPurchase={selectedPurchase} />

        </section>
    )
}


