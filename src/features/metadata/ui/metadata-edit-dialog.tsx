'use client'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
    getMetadataById,
    updateMetadataById,
} from '@/features/metadata/service/metadata.service'
import { EditMetadata } from '@/features/metadata/types'

const formSchema = z.object({
    updatedAt: z.string().optional(),
    tags: z
        .array(
            z.object({
                value: z.string().optional(),
            })
        )
        .optional(),
})

type FormSchema = z.infer<typeof formSchema>

interface MetadataEditDialogProps {
    id: string
}

export default function MetadataEditDialog({ id }: MetadataEditDialogProps) {
    const queryClient = useQueryClient()
    const [isOpen, setIsOpen] = useState(false)

    const { data: metadata } = useQuery({
        queryKey: ['metadata', { id }],
        queryFn: () => getMetadataById(id),
    })

    const { register, handleSubmit, control, reset } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            updatedAt: '',
            tags: [{ value: '' }],
        },
        mode: 'onBlur',
        reValidateMode: 'onChange',
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'tags',
    })

    const updateMetadataByIdMutation = useMutation({
        mutationFn: (metadata: EditMetadata) =>
            updateMetadataById(id, metadata),
        onSuccess: () => {
            toast.success('Metadata updated successfully')
            queryClient.invalidateQueries({ queryKey: ['metadata', { id }] })
            setIsOpen(false)
            reset()
        },
        onError: (error) => {
            toast.error(`Error updating metadata: ${error.message}`)
        },
    })

    const onSubmit = (data: FormSchema) => {
        const metadata = {
            updatedAt: data.updatedAt || null,
            tags:
                data.tags
                    ?.map((tag) => tag.value || undefined)
                    .filter((tag) => tag !== undefined) || null,
        }
        updateMetadataByIdMutation.mutate({
            metadata,
        })
    }

    useEffect(() => {
        if (isOpen) {
            reset()
        }
    }, [isOpen, reset])

    useEffect(() => {
        if (metadata) {
            reset({
                updatedAt: metadata.updatedAt || '',
                tags: metadata.tags?.map((tag) => ({ value: tag })) || [
                    { value: '' },
                ],
            })
        }
    }, [metadata, reset])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Metadata</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Metadata</DialogTitle>
                    <DialogDescription>
                        Update the metadata for this photo.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="updatedAt">Updated At</label>
                        <Input
                            type="datetime-local"
                            {...register('updatedAt')}
                        />
                    </div>

                    <div className="mt-4">
                        <h3>Tags</h3>
                        {fields.map((field, index) => (
                            <div
                                key={field.id}
                                className="mt-2 flex items-center"
                            >
                                <Input
                                    type="text"
                                    className="block w-full rounded border p-2 text-sm"
                                    {...register(`tags.${index}.value`)}
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() => remove(index)}
                                    className="ml-2"
                                >
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            onClick={() => append({ value: '' })}
                            className="mt-2"
                        >
                            Add Tag
                        </Button>
                    </div>
                    <Button type="submit" className="mt-4">
                        Save Changes
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
