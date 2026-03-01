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
import { firmSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form"
import { useEffect } from "react";
import { Input } from "./ui/input";

const emptyFirmForm = {
    name: '',
    phone: '',
    address: '',
    image: ''
}

export function FirmModal({ open, onOpenChange, selectedFirm }) {
    const { createStockData, updateStockData } = useStockCall();
    const isEditMode = Boolean(selectedFirm?._id)

    const form = useForm({
        resolver: zodResolver(firmSchema),
        defaultValues: emptyFirmForm
    });

    const { isSubmitting } = form.formState;

    useEffect(() => {
        if (!open) return

        if (isEditMode) {
            form.reset({
                name: selectedFirm.name ?? '',
                phone: selectedFirm.phone ?? '',
                address: selectedFirm.address ?? '',
                image: selectedFirm.image ?? ''
            })
            return
        }

        form.reset(emptyFirmForm)
    }, [open, isEditMode, selectedFirm, form])

    async function onSubmit(data) {
        try {
            const isSuccess = isEditMode
                ? await updateStockData('firms', selectedFirm._id, data)
                : await createStockData('firms', data)

            if (isSuccess) {
                form.reset(emptyFirmForm)
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
                    <DialogTitle>{isEditMode ? 'Edit Firm' : 'Create New Firm'}</DialogTitle>
                    <DialogDescription>
                        {isEditMode
                            ? 'Update the selected firm information.'
                            : 'Create a new firm by filling the form below.'}
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
                                            placeholder="Enter firm name"
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
                                name="phone"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="phone">Phone</FieldLabel>
                                        <Input
                                            {...field}
                                            id="phone"
                                            type="text"
                                            placeholder='Enter phone number'
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
                                name="address"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="address">Address</FieldLabel>
                                        <Input
                                            {...field}
                                            id="address"
                                            type="text"
                                            placeholder='Enter address'
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
                                            placeholder='Enter firm image'
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
                                    ? (isEditMode ? 'Updating Firm...' : 'Creating Firm...')
                                    : (isEditMode ? 'Update Firm' : 'Create Firm')}
                            </Button>
                        </Field>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
