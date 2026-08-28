import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { purchaseSchema } from "../schemas"
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import useStock from "../useStock"
import { useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSelector } from "react-redux"
import { selectBrands, selectBrandsStatus, selectFirms, selectFirmsStatus, selectProducts, selectProductsStatus } from "../stockSlice"
import { Skeleton } from "@/components/ui/skeleton"


export function PurchaseModal({ open, onOpenChange, selectedPurchase }) {

    const { createStock, updateStock, getStockResources } = useStock();
    const brands = useSelector(selectBrands);
    const products = useSelector(selectProducts);
    const firms = useSelector(selectFirms);
    const brandsStatus = useSelector(selectBrandsStatus);
    const firmsStatus = useSelector(selectFirmsStatus);
    const productsStatus = useSelector(selectProductsStatus);

    const isBrandsLoading = brandsStatus === 'idle' || (brandsStatus === 'loading' && brandsStatus.length === 0);
    const isProductsLoading = productsStatus === 'idle' || (productsStatus === 'loading' && productsStatus.length === 0);
    const isFirmsLoading = firmsStatus === 'idle' || (firmsStatus === 'loading' && firmsStatus.length === 0);
    const isEditMode = Boolean(selectedPurchase);

    const form = useForm({
        resolver: zodResolver(purchaseSchema),
        defaultValues: {
            brandId: "",
            firmId: "",
            productId: "",
            quantity: "",
            price: "",
        },
    })

    useEffect(() => {

        form.reset({
            brandId: selectedPurchase?.brandId || "",
            firmId: selectedPurchase?.firmId || "",
            productId: selectedPurchase?.productId || "",
            quantity: selectedPurchase?.quantity || "",
            price: selectedPurchase?.price || "",
        })

    }, [open, selectedPurchase])


    const { isSubmitting } = form.formState

    function onSubmit(data) {
        console.log(data)

        if (isEditMode) {
            updateStock('purchases', selectedPurchase._id, data)
        } else {
            createStock('purchases', data)
        }
        onOpenChange(false)
    }

    useEffect(() => {

        if (!open) return

        // getStock('firms')
        // getStock('brands')
        // getStock('products')

        getStockResources(['brands', 'products', 'firms'])

    }, [open])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {/* <DialogTrigger render={<Button>Create New Purchase</Button>} /> */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditMode ? "Edit Purchase" : "Create New Purchase"}</DialogTitle>
                    <DialogDescription>
                        {
                            isEditMode ? 'You can update purchase for the company you work with.' : " You can create a new purchase for the company you work with."
                        }
                    </DialogDescription>
                </DialogHeader>
                <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
                    <form id="purchase-create-frm" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="firmId"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field
                                        orientation="responsive"
                                        data-invalid={fieldState.invalid}
                                    >
                                        <FieldContent>
                                            <FieldLabel htmlFor="form-rhf-select-firmId">
                                                Firm
                                            </FieldLabel>
                                        </FieldContent>
                                        {
                                            isFirmsLoading
                                                ? <Skeleton className='h-9 w-full' />
                                                : (<Select
                                                    name={field.name}
                                                    value={field.value || null}
                                                    onValueChange={field.onChange}
                                                    items={[
                                                        { value: null, label: "Select Firm" },
                                                        ...firms.map((brand) => ({
                                                            value: brand._id,
                                                            label: brand.name,
                                                        })),
                                                    ]}
                                                >
                                                    <SelectTrigger
                                                        id="form-rhf-select-firmId"
                                                        aria-invalid={fieldState.invalid}
                                                        className="min-w-30"
                                                    >
                                                        <SelectValue placeholder="Select Firm" />
                                                    </SelectTrigger>
                                                    <SelectContent position="item-aligned">
                                                        <SelectItem value={null}>Select Firm</SelectItem>
                                                        <SelectSeparator />
                                                        {firms.map((firm) => (
                                                            <SelectItem key={firm._id} value={firm._id}>
                                                                {firm.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>)
                                        }
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="brandId"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field
                                        orientation="responsive"
                                        data-invalid={fieldState.invalid}
                                    >
                                        <FieldContent>
                                            <FieldLabel htmlFor="form-rhf-select-brandId">
                                                Brand
                                            </FieldLabel>
                                        </FieldContent>
                                        {
                                            isBrandsLoading
                                                ? <Skeleton className='h-9 w-full' />
                                                : (<Select
                                                    name={field.name}
                                                    value={field.value || null}
                                                    onValueChange={field.onChange}
                                                    items={[
                                                        { value: null, label: "Select Brand" },
                                                        ...brands.map((brand) => ({
                                                            value: brand._id,
                                                            label: brand.name,
                                                        })),
                                                    ]}
                                                >
                                                    <SelectTrigger
                                                        id="form-rhf-select-brandId"
                                                        aria-invalid={fieldState.invalid}
                                                        className="min-w-30"
                                                    >
                                                        <SelectValue placeholder="Select Brand" />
                                                    </SelectTrigger>
                                                    <SelectContent position="item-aligned">
                                                        <SelectItem value={null}>Select Brand</SelectItem>
                                                        <SelectSeparator />
                                                        {brands.map((brand) => (
                                                            <SelectItem key={brand._id} value={brand._id}>
                                                                {brand.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>)
                                        }
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="productId"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field
                                        orientation="responsive"
                                        data-invalid={fieldState.invalid}
                                    >
                                        <FieldContent>
                                            <FieldLabel htmlFor="form-rhf-select-productId">
                                                Product
                                            </FieldLabel>
                                        </FieldContent>
                                        {
                                            isProductsLoading
                                                ? <Skeleton className='h-9 w-full' />
                                                : (<Select
                                                    name={field.name}
                                                    value={field.value || null}
                                                    onValueChange={field.onChange}
                                                    items={[
                                                        { value: null, label: "Select Product" },
                                                        ...products.map((product) => ({
                                                            value: product._id,
                                                            label: product.name,
                                                        })),
                                                    ]}
                                                >
                                                    <SelectTrigger
                                                        id="form-rhf-select-productId"
                                                        aria-invalid={fieldState.invalid}
                                                        className="min-w-30"
                                                    >
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent position="item-aligned">
                                                        <SelectItem value={null}>Select Product</SelectItem>
                                                        <SelectSeparator />
                                                        {products.map((product) => (
                                                            <SelectItem key={product._id} value={product._id}>
                                                                {product.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>)
                                        }
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="quantity"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="quantity">
                                            Quantity
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="quantity"
                                            type='number'
                                            min="1"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter quantity"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="price"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="price">
                                            Unit Price
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="price"
                                            type='number'
                                            min="0"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter unit price"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </form>
                </div>
                <DialogFooter>
                    <DialogClose render={<Button variant="outline">Close</Button>} />
                    <Button type="submit" form="purchase-create-frm">{isSubmitting ? "Saving..." : isEditMode ? "Update Purchase" : "Create Purchase"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
