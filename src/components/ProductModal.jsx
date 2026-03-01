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
import { productSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form"
import { useEffect } from "react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useSelector } from "react-redux";
import { selectBrands, selectBrandsStatus, selectCategories, selectCategoriesStatus } from "@/features/stockSlice";
import { Skeleton } from "./ui/skeleton";

const emptyProductForm = {
    brandId: '',
    categoryId: '',
    name: '',
    quantity: '',
    price: ''
}


export function ProductModal({ open, onOpenChange, selectedProduct }) {
    const { createStockData, updateStockData, getStockResources } = useStockCall();
    const brands = useSelector(selectBrands)
    const brandStatus = useSelector(selectBrandsStatus)
    const categories = useSelector(selectCategories)
    const categoryStatus = useSelector(selectCategoriesStatus)

    const isEditMode = Boolean(selectedProduct?._id)

    const form = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: emptyProductForm
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
            name: 'categoryId',
            id: 'category',
            label: 'Category',
            placeholder: 'Select Category',
            status: categoryStatus,
            options: categories,
        },
    ]

    const requiredResources = [
        { name: 'brands', status: brandStatus },
        { name: 'categories', status: categoryStatus },
    ]

    useEffect(() => {
        if (!open) return

        if (isEditMode) {
            form.reset({
                brandId: selectedProduct.brandId ?? '',
                categoryId: selectedProduct.categoryId ?? '',
                quantity: selectedProduct.quantity ?? '',
                name: selectedProduct.name ?? ''
            })
            return
        }

        form.reset(emptyProductForm)
    }, [open, isEditMode, selectedProduct, form])

    useEnsureStockResources({
        open,
        resources: requiredResources,
        fetchResources: getStockResources,
    })

    async function onSubmit(data) {
        try {
            const isSuccess = isEditMode
                ? await updateStockData('products', selectedProduct._id, data)
                : await createStockData('products', data)

            if (isSuccess) {
                form.reset(emptyProductForm)
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
                    <DialogTitle>{isEditMode ? 'Edit Product' : 'Create New Product'}</DialogTitle>
                    <DialogDescription>
                        {isEditMode
                            ? 'Update the selected product information.'
                            : 'Create a new product by filling the form below.'}
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
                                    ? (isEditMode ? 'Updating Product...' : 'Creating Product...')
                                    : (isEditMode ? 'Update Product' : 'Create Product')}
                            </Button>
                        </Field>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
