import { useSelector } from "react-redux";
import { selectSales, selectSalesStatus } from "../stockSlice";
import useStock from "../useStock";
import { useEffect } from "react";
import { DataTable } from "@/components/shared/table/data-table";
import { saleColumns } from "@/components/shared/table/column";
import { TableSkeleton } from "@/components/shared/Skeletons";
import { SaleModal } from "../components/sale-modal";
import { useState } from "react";


export default function SalePage() {

    const { getStock } = useStock();
    const [open, setOpen] = useState(false);
    const [selectedSale, setSelectedSale] = useState(null)
    const sales = useSelector(selectSales);

    const salesStatus = useSelector(selectSalesStatus);
    const isLoading = salesStatus === 'idle' || (salesStatus === 'loading' && sales.length === 0);
    
    const handleModalChange = (isOpen) => {
        setOpen(isOpen)
        if (!isOpen) {
            setSelectedSale(null)
        }
    }

    const handleEdit = (sale) => {

        setOpen(true)
        setSelectedSale({
            _id: sale._id,
            brandId: sale?.brandId?._id,
            productId: sale?.productId?._id,
            quantity: sale.quantity,
            price: sale.price
        })
    }


    useEffect(() => {
        getStock('sales')
    }, [])



    return (
        <section className='space-y-4 p-4'>

            {
                isLoading
                    ? <TableSkeleton />
                    : (
                        <div className='rounded-md border flex flex-col gap-8 p-8'>
                            <div className="flex flex-col gap-1">
                                <h2 className="text-2xl font-semibold tracking-tight">Sales</h2>
                                <p className="text-muted-foreground">Track and manage all sales transactions by firm, brand, product, quantity and amount.</p>
                            </div>

                            <DataTable
                                columns={saleColumns(handleEdit)}
                                data={sales}
                                onOpenModal={() => handleModalChange(true)}
                            />
                        </div>
                    )
            }

            <SaleModal open={open} onOpenChange={handleModalChange} selectedSale={selectedSale} />

        </section>
    )
}


