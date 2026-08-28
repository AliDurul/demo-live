import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createColumnHelper } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./data-table-column-header"
import { format } from 'date-fns';
import { Edit } from "lucide-react"
import { Link } from "react-router-dom"
import { DeleteAlert } from "../delete-alert"


// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper()

export const purchaseColumns = (handleEdit) => columnHelper.columns([

    columnHelper.display({
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                indeterminate={
                    table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
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
    }),

    columnHelper.accessor("createdAt", {
        header: ({ column }) => (<DataTableColumnHeader column={column} title="Created Date" />),
        cell: ({ row }) => <div>{format(new Date(row.getValue("createdAt")), 'dd/MM/yyyy')}</div>
    }),
    columnHelper.accessor("firmId.name", {
        header: ({ column }) => (<DataTableColumnHeader column={column} title="Firm" />),
    }),
    columnHelper.accessor("brandId.name", {
        header: ({ column }) => (<DataTableColumnHeader column={column} title="Brand" />),
    }),
    columnHelper.accessor("productId.name", {
        header: ({ column }) => (<DataTableColumnHeader column={column} title="Product" />),
    }),
    columnHelper.accessor("quantity", {
        header: ({ column }) => (<DataTableColumnHeader column={column} title="Quantity" />),
    }),
    columnHelper.accessor("price", {
        header: ({ column }) => (<DataTableColumnHeader column={column} title="Unit Price" />),
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price)

            return <div className=" font-medium">{formatted}</div>
        },
    }),
    columnHelper.accessor("amount", {
        header: ({ column }) => (<DataTableColumnHeader column={column} title="Total Amount" className="justify-end" />),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    }),

    columnHelper.display({
        id: "actions",
        cell: ({ row }) => {
            const purchase = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />} >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40" align="end">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEdit(purchase)}>
                                Edit
                                <DropdownMenuShortcut><Edit /></DropdownMenuShortcut>
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem variant="destructive">
                                Delete
                                <DropdownMenuShortcut><Delete /></DropdownMenuShortcut>
                            </DropdownMenuItem> */}
                            <DeleteAlert url='sales' id={purchase._id} className='w-full rounded-xl justify-between' showIcon />
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Links</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                                <Link to={`/stock/firms/${purchase?.firmId?._id}`}>View Firm</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to={`/stock/purchases/${purchase._id}`}>View Purchase Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(purchase._id)}
                            >
                                Copy purchase ID
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu >
            )
        },
    }),
])

export const saleColumns = (handleEdit) => columnHelper.columns([

    columnHelper.display({
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                indeterminate={
                    table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
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
    }),

    columnHelper.accessor("createdAt", {
        header: ({ column }) => (<DataTableColumnHeader column={column} title="Created Date" />),
        cell: ({ row }) => <div>{format(new Date(row.getValue("createdAt")), 'dd/MM/yyyy')}</div>
    }),
    columnHelper.accessor("brandId.name", {
        header: ({ column }) => (<DataTableColumnHeader column={column} title="Brand" />),
    }),
    columnHelper.accessor("productId.name", {
        header: ({ column }) => (<DataTableColumnHeader column={column} title="Product" />),
    }),
    columnHelper.accessor("quantity", {
        header: ({ column }) => (<DataTableColumnHeader column={column} title="Quantity" />),
    }),
    columnHelper.accessor("price", {
        header: ({ column }) => (<DataTableColumnHeader column={column} title="Unit Price" />),
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price)

            return <div className=" font-medium">{formatted}</div>
        },
    }),
    columnHelper.accessor("amount", {
        header: ({ column }) => (<DataTableColumnHeader column={column} title="Total Amount" className="justify-end" />),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    }),

    columnHelper.display({
        id: "actions",
        cell: ({ row }) => {
            const sale = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />} >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40" align="end">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEdit(sale)}>
                                Edit
                                <DropdownMenuShortcut><Edit /></DropdownMenuShortcut>
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem variant="destructive">
                                Delete
                                <DropdownMenuShortcut><Delete /></DropdownMenuShortcut>
                            </DropdownMenuItem> */}
                            <DeleteAlert url='sales' id={sale._id} className='w-full rounded-xl justify-between' showIcon />
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Links</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                                <Link to={`/stock/sales/${sale._id}`}>View Sale Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(sale._id)}
                            >
                                Copy Sale ID
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu >
            )
        },
    }),
])

export const productColumns = (handleEdit) => columnHelper.columns([

    columnHelper.display({
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                indeterminate={
                    table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
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
    }),

    columnHelper.accessor("name", {
        header: ({ column }) => (<DataTableColumnHeader column={column} title="Name" />),
    }),
    columnHelper.accessor("categoryId.name", {
        header: ({ column }) => (<DataTableColumnHeader column={column} title="Category" />),
    }),
    columnHelper.accessor("brandId.name", {
        header: ({ column }) => (<DataTableColumnHeader column={column} title="Brand" />),
    }),
    columnHelper.accessor("quantity", {
        header: ({ column }) => (<DataTableColumnHeader column={column} title="Quantity" />),
    }),
    columnHelper.accessor("createdAt", {
        header: ({ column }) => (<DataTableColumnHeader column={column} title="Created Date" />),
        cell: ({ row }) => <div>{format(new Date(row.getValue("createdAt")), 'dd/MM/yyyy')}</div>
    }),

    columnHelper.display({
        id: "actions",
        cell: ({ row }) => {
            const product = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />} >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40" align="end">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEdit(product)}>
                                Edit
                                <DropdownMenuShortcut><Edit /></DropdownMenuShortcut>
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem variant="destructive">
                                Delete
                                <DropdownMenuShortcut><Delete /></DropdownMenuShortcut>
                            </DropdownMenuItem> */}
                            <DeleteAlert url='products' id={product._id} className='w-full rounded-xl justify-between' showIcon />
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Links</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                                <Link to={`/stock/products/${product._id}`}>View Sale Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(product._id)}
                            >
                                Copy Sale ID
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu >
            )
        },
    }),
])