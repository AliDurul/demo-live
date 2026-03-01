import { ErrorCard, NotFoundCard } from '@/components/shared/InfoCards'
import { DataTable } from '@/components/shared/table/data-table'
import { selectError, selectProducts, selectProductsStatus } from '@/features/stockSlice'
import useStockCall from '@/hooks/useStockCall'
import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from 'date-fns'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from '@/components/shared/table/data-table-column-header'
import { Link } from 'react-router-dom'
import { Delete } from 'lucide-react'
import { Edit } from 'lucide-react'
import { useState } from 'react'
import { TableSkeleton } from '@/components/shared/Skeletons'
import { ProductModal } from '@/components/ProductModal'
import { AlertDial } from '@/components/AlertDial'

export default function Products() {
    const { getStockData, deleteStockData } = useStockCall()
    const products = useSelector(selectProducts)
    const productsStatus = useSelector(selectProductsStatus)
    const error = useSelector(selectError)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)

    useEffect(() => {
        getStockData('products')
    }, [getStockData])

    const handleModalChange = (isOpen) => {
        setModalOpen(isOpen)
        if (!isOpen) {
            setSelectedProduct(null)
        }
    }

    const showLoadingSkeleton = productsStatus === 'idle' || (productsStatus === 'loading' && products.length === 0)

    const handleEdit = (product) => {
        setSelectedProduct({
            ...product,
            brandId: product?.brandId?._id ?? product?.brandId ?? '',
            categoryId: product?.categoryId?._id ?? product?.categoryId ?? '',
            quantity: product?.quantity?.toString() ?? '',
            name: product?.name ?? '',
        })
        setModalOpen(true)
    }

    const handleDelete = async (productId) => {
        await deleteStockData('products', productId)
    }
    
    const columns = getColumns({ onEdit: handleEdit, onDelete: handleDelete })

    return (
        <section className="pt-3 px-5">
            <div className='rounded-md border'>
                <div className="flex h-full flex-1 flex-col gap-8 p-8">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                                Products
                            </h2>
                            <p className="text-muted-foreground">
                                Track and manage all products transactions by brand, product, quantity, price and amount.
                            </p>
                        </div>
                    </div>
                    {error && <ErrorCard error={error} />}
                    {
                        showLoadingSkeleton
                            ? <TableSkeleton />
                            : products.length === 0
                                ? <NotFoundCard />
                                : (<DataTable
                                    columns={columns}
                                    data={products}
                                    searchPlaceholder="Search product, brand, category, quantity..."
                                    searchableFields={[
                                        "brandId.name",
                                        "categoryId.name",
                                        "name",
                                        "quantity",
                                    ]}
                                    onAddNew={() => setModalOpen(true)}
                                />)
                    }
                </div>
            </div>
            <ProductModal
                open={modalOpen}
                onOpenChange={handleModalChange}
                selectedProduct={selectedProduct}
            />
        </section>
    )
}

const getColumns = ({ onEdit, onDelete }) => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (<DataTableColumnHeader column={column} isSorted={column.getIsSorted()} title="Created At" />),
        cell: ({ row }) => <div className=" font-medium">{format(new Date(row.getValue("createdAt")), "MMM dd, yyyy")}</div>
    },
    {
        id: 'category',
        accessorFn: (row) => row.categoryId ? row.categoryId.name : "N/A",
        header: ({ column }) => (<DataTableColumnHeader column={column} isSorted={column.getIsSorted()} title="Category" />),
    },
    {
        id: 'brand',
        accessorFn: (row) => row.brandId ? row.brandId.name : "N/A",
        header: ({ column }) => (<DataTableColumnHeader column={column} isSorted={column.getIsSorted()} title="Brand" />),
    },
    {
        id: 'name',
        accessorFn: (row) => row.name ? row.name : "N/A",
        header: ({ column }) => (<DataTableColumnHeader column={column} isSorted={column.getIsSorted()} title="Name" />),
    },
    {
        accessorKey: "quantity",
        header: ({ column }) => (<DataTableColumnHeader column={column} isSorted={column.getIsSorted()} title="Stock" />),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const product = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className={'min-w-40'}>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem onClick={() => onEdit(product)}>
                            Edit
                            <DropdownMenuShortcut><Edit /></DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <AlertDial
                            title="Delete product?"
                            description="This action cannot be undone. This product record will be permanently deleted."
                            onConfirm={() => onDelete(product._id)}
                        >
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} variant="destructive">
                                Delete
                                <DropdownMenuShortcut><Delete /></DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </AlertDial>

                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Links</DropdownMenuLabel>
                        {/* <DropdownMenuSeparator /> */}

                        <DropdownMenuItem asChild>
                            <Link to={`/stock/products/${product._id}`}>View product details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(product._id)}
                        >
                            Copy product ID
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]