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
import { brandSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form"
import { useEffect } from "react";
import { Input } from "./ui/input";

const emptyBrandForm = {
    name: '',
    image: ''
}

export function BrandModal({ open, onOpenChange, selectedBrand }) {
    const { createStockData, updateStockData } = useStockCall();
    const isEditMode = Boolean(selectedBrand?._id)

    const form = useForm({
        resolver: zodResolver(brandSchema),
        defaultValues: emptyBrandForm
    });

    const { isSubmitting } = form.formState;

    useEffect(() => {
        if (!open) return

        if (isEditMode) {
            form.reset({
                name: selectedBrand.name ?? '',
                image: selectedBrand.image ?? ''
            })
            return
        }

        form.reset(emptyBrandForm)
    }, [open, isEditMode, selectedBrand, form])

    async function onSubmit(data) {
        try {
            const isSuccess = isEditMode
                ? await updateStockData('brands', selectedBrand._id, data)
                : await createStockData('brands', data)

            if (isSuccess) {
                form.reset(emptyBrandForm)
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
                    <DialogTitle>{isEditMode ? 'Edit Brand' : 'Create New Brand'}</DialogTitle>
                    <DialogDescription>
                        {isEditMode
                            ? 'Update the selected brand information.'
                            : 'Create a new brand by filling the form below.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
                        <FieldGroup>
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="name">Name</FieldLabel>
                                        <Input
                                            {...field}
                                            id="name"
                                            type="text"
                                            placeholder="Enter brand name"
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
                                name="image"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="image">Image Link</FieldLabel>
                                        <Input
                                            {...field}
                                            id="image"
                                            type="text"
                                            placeholder='Enter brand image'
                                            disabled={isSubmitting}
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                        </FieldGroup>
                    </div>
                    <DialogFooter className={'flex mt-5'}>
                        <DialogClose asChild>
                            <Button variant="outline">Close</Button>
                        </DialogClose>
                        <Field>
                            <Button type="submit" disabled={isSubmitting} className="">
                                {isSubmitting
                                    ? (isEditMode ? 'Updating Brand...' : 'Creating Brand...')
                                    : (isEditMode ? 'Update Brand' : 'Create Brand')}
                            </Button>
                        </Field>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
