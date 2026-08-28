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
import { productSchema } from "../schemas"
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import useStock from "../useStock"
import { useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSelector } from "react-redux"
import { selectBrands, selectCategories } from "../stockSlice"


export function ProductModal({ open, onOpenChange, selectedProduct }) {

    const { createStock, updateStock, getStock } = useStock();
    const brands = useSelector(selectBrands);
    const categories = useSelector(selectCategories);

    const isEditMode = Boolean(selectedProduct);

    const form = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            brandId: "",
            categoryId: "",
            name: "",
        },
    })

    useEffect(() => {

        form.reset({
            brandId: selectedProduct?.brandId || "",
            categoryId: selectedProduct?.categoryId || "",
            name: selectedProduct?.name || "",
        })

    }, [open, selectedProduct])


    const { isSubmitting } = form.formState

    function onSubmit(data) {

        if (isEditMode) {
            updateStock('products', selectedProduct._id, data)
        } else {
            createStock('products', data)
        }
        onOpenChange(false)
    }

    useEffect(() => {

        if (!open) return

        getStock('brands')
        getStock('categories')

    }, [open])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {/* <DialogTrigger render={<Button>Create New Product</Button>} /> */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditMode ? "Edit Product" : "Create New Product"}</DialogTitle>
                    <DialogDescription>
                        {
                            isEditMode ? 'You can update product for the company you work with.' : " You can create a new product for the company you work with."
                        }
                    </DialogDescription>
                </DialogHeader>
                <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
                    <form id="product-create-frm" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>

                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="name">
                                            Product Name
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="name"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter product name"
                                            autoComplete="off"
                                        />
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
                                        <Select
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
                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="categoryId"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field
                                        orientation="responsive"
                                        data-invalid={fieldState.invalid}
                                    >
                                        <FieldContent>
                                            <FieldLabel htmlFor="form-rhf-select-categoryId">
                                                Category
                                            </FieldLabel>
                                        </FieldContent>
                                        <Select
                                            name={field.name}
                                            value={field.value || null}
                                            onValueChange={field.onChange}
                                            items={[
                                                { value: null, label: "Select Category" },
                                                ...categories.map((category) => ({
                                                    value: category._id,
                                                    label: category.name,
                                                })),
                                            ]}
                                        >
                                            <SelectTrigger
                                                id="form-rhf-select-categoryId"
                                                aria-invalid={fieldState.invalid}
                                                className="min-w-30"
                                            >
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent position="item-aligned">
                                                <SelectItem value={null}>Select Category</SelectItem>
                                                <SelectSeparator />
                                                {categories.map((category) => (
                                                    <SelectItem key={category._id} value={category._id}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
                    <Button type="submit" form="product-create-frm">{isSubmitting ? "Saving..." : isEditMode ? "Update Product" : "Create Product"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
