import { useState } from "react";
import { useSelector } from "react-redux";
import { selectProducts, selectProductsStatus } from "../stockSlice";
import useStock from "../useStock";
import { useEffect } from "react";
import { DataTable } from "@/components/shared/table/data-table";
import { productColumns } from "@/components/shared/table/column";
import { TableSkeleton } from "@/components/shared/Skeletons";
import { ProductModal } from "../components/product-modal";


export default function ProductPage() {

    const { getStock } = useStock();
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null)
    const products = useSelector(selectProducts);
    const productsStatus = useSelector(selectProductsStatus);
    const isLoading = productsStatus === 'idle' || (productsStatus === 'loading' && products.length === 0);

    const handleModalChange = (isOpen) => {
        setOpen(isOpen)
        if (!isOpen) {
            setSelectedProduct(null)
        }
    }

    const handleEdit = (product) => {
        setOpen(true)
        setSelectedProduct({
            _id: product._id,
            brandId: product?.brandId?._id,
            categoryId: product?.categoryId?._id,
            name: product.name,
        })
    }


    useEffect(() => {
        getStock('products')
    }, [])

    return (
        <section className='space-y-4 p-4'>

            {
                isLoading
                    ? <TableSkeleton />
                    : (
                        <div className='rounded-md border flex flex-col gap-8 p-8'>
                            <div className="flex flex-col gap-1">
                                <h2 className="text-2xl font-semibold tracking-tight">Products</h2>
                                <p className="text-muted-foreground">Track and manage all products transactions by firm, brand, product, quantity and amount.</p>
                            </div>

                            <DataTable
                                columns={productColumns(handleEdit)}
                                data={products}
                                onOpenModal={() => handleModalChange(true)}
                            />
                        </div>
                    )
            }

            <ProductModal open={open} onOpenChange={handleModalChange} selectedProduct={selectedProduct} />

        </section>
    )
}


