
import { ErrorCard, NotFoundCard } from '@/components/shared/InfoCards'

import { DataTable } from '@/components/shared/table/data-table'
import { selectError, selectPurchases, selectPurchasesStatus } from '@/features/stockSlice'
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
import { PurchaseModal } from '@/components/PurchaseModal'
import { useState } from 'react'
import { TableSkeleton } from '@/components/shared/Skeletons'
import { currenceyFormatter } from '@/lib/utils'
import { AlertDial } from '@/components/AlertDial'

export default function Purchases() {
    const { getStockData, deleteStockData } = useStockCall()
    const purchases = useSelector(selectPurchases)
    const purchasesStatus = useSelector(selectPurchasesStatus)
    const error = useSelector(selectError)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedPurchase, setSelectedPurchase] = useState(null)

    useEffect(() => {
        getStockData('purchases')
    }, [getStockData])

    const handleModalChange = (isOpen) => {
        setModalOpen(isOpen)
        if (!isOpen) {
            setSelectedPurchase(null)
        }
    }

    const showLoadingSkeleton = purchasesStatus === 'idle' || (purchasesStatus === 'loading' && purchases.length === 0)

    const handleEdit = (purchase) => {
        setSelectedPurchase({
            ...purchase,
            firmId: purchase?.firmId?._id ?? purchase?.firmId ?? '',
            brandId: purchase?.brandId?._id ?? purchase?.brandId ?? '',
            productId: purchase?.productId?._id ?? purchase?.productId ?? '',
            quantity: purchase?.quantity?.toString() ?? '',
            price: purchase?.price?.toString() ?? '',
        })
        setModalOpen(true)
    }

    const handleDelete = async (purchaseId) => {
        await deleteStockData('purchases', purchaseId)
    }
    const columns = getColumns({ onEdit: handleEdit, onDelete: handleDelete })

    return (
        <section className="pt-3 px-5">
            <div className='rounded-md border'>
                <div className="flex h-full flex-1 flex-col gap-8 p-8">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                                Purchases
                            </h2>
                            <p className="text-muted-foreground">
                                Track and manage all purchase transactions by firm, brand, product, quantity, and amount.
                            </p>
                        </div>
                    </div>
                    {error && <ErrorCard error={error} />}
                    {
                        showLoadingSkeleton
                            ? <TableSkeleton />
                            : purchases.length === 0
                                ? <NotFoundCard />
                                : (<DataTable
                                    columns={columns}
                                    data={purchases}
                                    searchPlaceholder="Search firm, brand, product, quantity..."
                                    searchableFields={[
                                        "firmId.name",
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
            <PurchaseModal
                open={modalOpen}
                onOpenChange={handleModalChange}
                selectedPurchase={selectedPurchase}
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
        id: 'firm',
        accessorFn: (row) => row.firmId ? row.firmId.name : "N/A",
        header: ({ column }) => (<DataTableColumnHeader column={column} isSorted={column.getIsSorted()} title="Firm" />),
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
            const amount = parseFloat(row.getValue("amount"))
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
            const purchase = row.original
            const firmId = purchase?.firmId?._id ?? purchase?.firmId?.id ?? null
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {/* <DropdownMenuSeparator /> */}

                        <DropdownMenuItem onClick={() => onEdit(purchase)}>
                            Edit
                            <DropdownMenuShortcut><Edit /></DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <AlertDial
                            title="Delete Purchase?"
                            description="This action cannot be undone. This purchase record will be permanently deleted."
                            onConfirm={() => onDelete(purchase._id)}
                        >
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} variant="destructive">
                                Delete
                                <DropdownMenuShortcut><Delete /></DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </AlertDial>

                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Links</DropdownMenuLabel>
                        {/* <DropdownMenuSeparator /> */}

                        {firmId ? (
                            <DropdownMenuItem asChild>
                                <Link to={`/stock/firms/${firmId}`}>View Firm</Link>
                            </DropdownMenuItem>
                        ) : (
                            <DropdownMenuItem disabled>No firm available</DropdownMenuItem>
                        )}
                        <DropdownMenuItem asChild>
                            <Link to={`/stock/purchases/${purchase._id}`}>View purchase details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(purchase._id)}
                        >
                            Copy purchase ID
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]