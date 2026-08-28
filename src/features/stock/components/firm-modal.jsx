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
import { firmSchema } from "../schemas"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import useStock from "../useStock"
import { useEffect } from "react"

export function FirmModal({ open, onOpenChange, selectedFirm }) {

    const { createStock, updateStock } = useStock();
    const isEditMode = Boolean(selectedFirm);

    const form = useForm({
        resolver: zodResolver(firmSchema),
        defaultValues: {
            name: "",
            phone: "",
            address: "",
            image: "",
        },
    })

    useEffect(() => {

        form.reset({
            name: selectedFirm?.name || "",
            phone: selectedFirm?.phone || "",
            address: selectedFirm?.address || "",
            image: selectedFirm?.image || "",
        })

    }, [open, selectedFirm])


    const { isSubmitting } = form.formState

    function onSubmit(data) {

        if (isEditMode) {
            updateStock('firms', selectedFirm._id, data)
        } else {
            createStock('firms', data)
        }
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger render={<Button>Create New Firm</Button>} />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditMode ? "Edit Firm" : "Create New Firm"}</DialogTitle>
                    <DialogDescription>
                        {
                            isEditMode ? 'You can update firm for the company you work with.' : " You can create a new firm for the company you work with."
                        }
                    </DialogDescription>
                </DialogHeader>
                <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
                    <form id="firm-create-frm" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="name">
                                            Firm Name
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="name"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter firm name"
                                            autoComplete="off"
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
                                        <FieldLabel htmlFor="phone">
                                            Firm Phone
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="phone"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter firm phone"
                                            autoComplete="off"
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
                                        <FieldLabel htmlFor="address">
                                            Firm Address
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="address"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter firm address"
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
                                            Firm Image Url
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="image"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter firm image url"
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
                    <Button type="submit" form="firm-create-frm">{isSubmitting ? "Saving..." : isEditMode ? "Update Firm" : "Create Firm"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
