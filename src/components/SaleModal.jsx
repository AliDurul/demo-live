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
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import useStockCall from "@/hooks/useStockCall"
import useEnsureStockResources from "@/hooks/useEnsureStockResources"
import { saleSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form"
import { useEffect } from "react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useSelector } from "react-redux";
import { selectBrands, selectBrandsStatus,  selectProducts, selectProductsStatus } from "@/features/stockSlice";
import { Skeleton } from "./ui/skeleton";

const emptySaleForm = {
    brandId: '',
    productId: '',
    quantity: '',
    price: ''
}


export function SaleModal({ open, onOpenChange, selectedSale }) {
    const { createStockData, updateStockData, getStockResources } = useStockCall();
    const brands = useSelector(selectBrands)
    const products = useSelector(selectProducts)
    const brandStatus = useSelector(selectBrandsStatus)
    const productStatus = useSelector(selectProductsStatus)

    const isEditMode = Boolean(selectedSale?._id)

    const form = useForm({
        resolver: zodResolver(saleSchema),
        defaultValues: emptySaleForm
    });

    const { isSubmitting } = form.formState;

    const selectFieldConfigs = [
        {
            name: 'brandId',
            id: 'brand',
            label: 'Brand',
            placeholder: 'Select Brand',
            status: brandStatus,
            options: brands,
        },
        {
            name: 'productId',
            id: 'product',
            label: 'Product',
            placeholder: 'Select Product',
            status: productStatus,
            options: products,
        },
    ]

    const requiredResources = [
        { name: 'brands', status: brandStatus },
        { name: 'products', status: productStatus },
    ]

    useEffect(() => {
        if (!open) return

        if (isEditMode) {
            form.reset({
                brandId: selectedSale.brandId ?? '',
                productId: selectedSale.productId ?? '',
                quantity: selectedSale.quantity ?? '',
                price: selectedSale.price ?? ''
            })
            return
        }

        form.reset(emptySaleForm)
    }, [open, isEditMode, selectedSale, form])

    useEnsureStockResources({
        open,
        resources: requiredResources,
        fetchResources: getStockResources,
    })

    async function onSubmit(data) {
        try {
            const isSuccess = isEditMode
                ? await updateStockData('sales', selectedSale._id, data)
                : await createStockData('sales', data)

            if (isSuccess) {
                form.reset(emptySaleForm)
                onOpenChange(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditMode ? 'Edit Sale' : 'Create New Sale'}</DialogTitle>
                    <DialogDescription>
                        {isEditMode
                            ? 'Update the selected sale information.'
                            : 'Create a new sale by filling the form below.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
                        <FieldGroup>
                            {selectFieldConfigs.map(({ name, id, label, placeholder, status, options }) => (
                                <Controller
                                    key={name}
                                    name={name}
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={id}>{label}</FieldLabel>
                                            {
                                                status === 'idle' || (status === 'loading' && options.length === 0)
                                                    ? <Skeleton className="h-9 w-full" />
                                                    : (<Select
                                                        name={field.name}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger
                                                            id={id}
                                                            aria-invalid={fieldState.invalid}
                                                            className="min-w-30"
                                                        >
                                                            <SelectValue placeholder={placeholder} />
                                                        </SelectTrigger>
                                                        <SelectContent position="item-aligned">
                                                            {options?.map((option) => (
                                                                <SelectItem key={option._id} value={option._id}>
                                                                    {option.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>)
                                            }
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                            ))}

                            <div className="flex gap-4">
                                <Controller
                                    name="quantity"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
                                            <Input
                                                {...field}
                                                id="quantity"
                                                type="number"
                                                min="1"
                                                placeholder='Enter quantity'
                                                disabled={isSubmitting}
                                                aria-invalid={fieldState.invalid}
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
                                            <FieldLabel htmlFor="price">Unit Price</FieldLabel>
                                            <Input
                                                {...field}
                                                id="price"
                                                type="number"
                                                min="0"
                                                placeholder='Enter unit price'
                                                disabled={isSubmitting}
                                                aria-invalid={fieldState.invalid}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </div>
                        </FieldGroup>
                    </div>
                    <DialogFooter className={'flex mt-5'}>
                        <DialogClose asChild>
                            <Button variant="outline">Close</Button>
                        </DialogClose>
                        <Field>
                            <Button type="submit" disabled={isSubmitting} className="">
                                {isSubmitting
                                    ? (isEditMode ? 'Updating Sale...' : 'Creating Sale...')
                                    : (isEditMode ? 'Update Sale' : 'Create Sale')}
                            </Button>
                        </Field>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
