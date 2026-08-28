import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { brandSchema } from "../schemas"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import useStock from "../useStock"
import { useEffect } from "react"

export function BrandModal({ open, onOpenChange, selectedBrand }) {

    const { createStock, updateStock } = useStock();

    const form = useForm({
        resolver: zodResolver(brandSchema),
        defaultValues: {
            name: "",
            image: "",
        },
    })

    useEffect(() => {

        form.reset({
            name: selectedBrand?.name || "",
            image: selectedBrand?.image || "",
        })

    }, [open, selectedBrand])


    const { isSubmitting } = form.formState
    const isEditMode = Boolean(selectedBrand);

    function onSubmit(data) {

        if (isEditMode) {
            updateStock('brands', selectedBrand._id, data)
        } else {
            createStock('brands', data)
        }
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger render={<Button>Create New Brand</Button>} />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditMode ? "Edit Brand" : "Create New Brand"}</DialogTitle>
                    <DialogDescription>
                        {
                            isEditMode ? 'You can update brand for the company you work with.' : " You can create a new brand for the company you work with."
                        }
                    </DialogDescription>
                </DialogHeader>
                <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
                    <form id="brand-create-frm" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="name">
                                            Brand Name
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="name"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter brand name"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="image"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="image">
                                            Brand Image Url
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="image"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter brand image url"
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
                    <Button type="submit" form="brand-create-frm">{isSubmitting ? "Saving..." : isEditMode ? "Update Brand" : "Create Brand"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
