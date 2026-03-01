import { purchaseSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from './ui/input'
import { InputGroup } from './ui/input-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const spokenLanguages = [
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Italian", value: "it" },
    { label: "Chinese", value: "zh" },
    { label: "Japanese", value: "ja" },
]

export default function PurchaseForm() {
    const form = useForm({
        resolver: zodResolver(purchaseSchema),
        defaultValues: {
            firmId: '',
            brandId: '',
            productId: '',
            quantity: '',
            price: '',
            language: ''
        },
    })


    async function onSubmit(data) {
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-demo-title">
                                Bug Title
                            </FieldLabel>
                            <Input
                                {...field}
                                id="form-rhf-demo-title"
                                aria-invalid={fieldState.invalid}
                                placeholder="Login button not working on mobile"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="language"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field orientation="responsive" data-invalid={fieldState.invalid}>
                            <FieldContent>
                                <FieldLabel htmlFor="form-rhf-select-language">
                                    Spoken Language
                                </FieldLabel>
                                <FieldDescription>
                                    For best results, select the language you speak.
                                </FieldDescription>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </FieldContent>
                            <Select
                                name={field.name}
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger
                                    id="form-rhf-select-language"
                                    aria-invalid={fieldState.invalid}
                                    className="min-w-30"
                                >
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="item-aligned">
                                    <SelectItem value="auto">Auto</SelectItem>
                                    <SelectItem value="en">English</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                    )}
                />
            </FieldGroup>
        </form>

    )
}
