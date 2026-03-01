import { ErrorCard, NotFoundCard } from '@/components/shared/InfoCards'
import { DataTable } from '@/components/shared/table/data-table'
import { selectError, selectSales, selectSalesStatus } from '@/features/stockSlice'
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
import { SaleModal } from '@/components/SaleModal'
import { currenceyFormatter } from '@/lib/utils'
import { AlertDial } from '@/components/AlertDial'

export default function Sales() {
    const { getStockData, deleteStockData } = useStockCall()
    const sales = useSelector(selectSales)
    const salesStatus = useSelector(selectSalesStatus)
    const error = useSelector(selectError)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedSale, setSelectedSale] = useState(null)

    useEffect(() => {
        getStockData('sales')
    }, [getStockData])

    const handleModalChange = (isOpen) => {
        setModalOpen(isOpen)
        if (!isOpen) {
            setSelectedSale(null)
        }
    }

    const showLoadingSkeleton = salesStatus === 'idle' || (salesStatus === 'loading' && sales.length === 0)

    const handleEdit = (sale) => {
        setSelectedSale({
            ...sale,
            brandId: sale?.brandId?._id ?? sale?.brandId ?? '',
            productId: sale?.productId?._id ?? sale?.productId ?? '',
            quantity: sale?.quantity?.toString() ?? '',
            price: sale?.price?.toString() ?? '',
        })
        setModalOpen(true)
    }

    const handleDelete = async (saleId) => {
        await deleteStockData('sales', saleId)
    }

    const columns = getColumns({ onEdit: handleEdit, onDelete: handleDelete })

    return (
        <section className="pt-3 px-5">
            <div className='rounded-md border'>
                <div className="flex h-full flex-1 flex-col gap-8 p-8">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                                Sales
                            </h2>
                            <p className="text-muted-foreground">
                                Track and manage all sales transactions by brand, product, quantity, price and amount.
                            </p>
                        </div>
                    </div>
                    {error && <ErrorCard error={error} />}
                    {
                        showLoadingSkeleton
                            ? <TableSkeleton />
                            : sales.length === 0
                                ? <NotFoundCard />
                                : (<DataTable
                                    columns={columns}
                                    data={sales}
                                    searchPlaceholder="Search brand, product, quantity..."
                                    searchableFields={[
                                        "brandId.name",
                                        "productId.name",
                                        "quantity",
                                        "price",
                                        "amount",
                                    ]}
                                    onAddNew={() => setModalOpen(true)}
                                />)
                    }
                </div>
            </div>
            <SaleModal
                open={modalOpen}
                onOpenChange={handleModalChange}
                selectedSale={selectedSale}
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
        id: 'brand',
        accessorFn: (row) => row.brandId ? row.brandId.name : "N/A",
        header: ({ column }) => (<DataTableColumnHeader column={column} isSorted={column.getIsSorted()} title="Brand" />),
    },
    {
        id: 'product',
        accessorFn: (row) => row.productId ? row.productId.name : "N/A",
        header: ({ column }) => (<DataTableColumnHeader column={column} isSorted={column.getIsSorted()} title="Product" />),
    },
    {
        accessorKey: "quantity",
        header: ({ column }) => (<DataTableColumnHeader column={column} isSorted={column.getIsSorted()} title="Quantity" />),
    },
    {
        accessorKey: "price",
        header: ({ column }) => (<DataTableColumnHeader column={column} isSorted={column.getIsSorted()} title="Unit Price" />),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price"))
            return <div className=" font-medium">{currenceyFormatter(amount)}</div>
        },
    },
    {
        accessorKey: "amount",
        header: ({ column }) => (<DataTableColumnHeader column={column} isSorted={column.getIsSorted()} title="Amount" />),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            return <div className=" font-medium">{currenceyFormatter(amount)}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const sale = row.original
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

                        <DropdownMenuItem onClick={() => onEdit(sale)}>
                            Edit
                            <DropdownMenuShortcut><Edit /></DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <AlertDial
                            title="Delete sale?"
                            description="This action cannot be undone. This sale record will be permanently deleted."
                            onConfirm={() => onDelete(sale._id)}
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
                            <Link to={`/stock/sales/${sale._id}`}>View sale details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(sale._id)}
                        >
                            Copy sale ID
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]