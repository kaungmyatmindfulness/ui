'use client'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { ErrorMessage } from '@hookform/error-message'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { Input } from '@/components/ui/input'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { uploadPhoto } from '@/features/photos/service/photo.service'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'

const formSchema = z.object({
    photo: z
        .any()
        .transform((fileList) => Array.from(fileList))
        .refine((files) => files.length > 0, {
            message: 'Photo is required',
        })
        .optional(),
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

export default function PhotoUploadDialog() {
    const queryClient = useQueryClient()
    const [isOpen, setIsOpen] = useState(false)

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            photo: undefined,
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

    const uploadPhotoMutation = useMutation({
        mutationFn: uploadPhoto,
        onSuccess: () => {
            toast.success('Photo uploaded successfully!')
            queryClient.invalidateQueries({ queryKey: ['photos'] })
            setIsOpen(false)
        },
        onError: (error) => {
            toast.error(
                `Failed to upload photo: ${error instanceof Error ? error.message : 'Unknown error'}`
            )
        },
    })

    const onSubmit = async (data: FormSchema) => {
        const photo = data.photo ? data.photo?.[0] : null
        if (!photo) return
        const metadata = {
            updatedAt: data.updatedAt || new Date().toISOString(),
            tags:
                data.tags
                    ?.map((tag) => tag.value || undefined)
                    .filter((tag) => tag !== undefined) || [],
        }
        uploadPhotoMutation.mutate({
            photo: photo as Blob,
            metadata,
        })
    }

    useEffect(() => {
        if (!isOpen) {
            reset({
                photo: undefined,
                updatedAt: '',
                tags: [{ value: '' }],
            })
        }
    }, [isOpen, reset])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} modal>
            <DialogTrigger asChild>
                <Button>Upload photo</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Photo</DialogTitle>
                    <DialogDescription>
                        Use the form below to upload a new photo. Edit the meta
                        data as needed.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <form
                        className="mt-4 flex flex-col gap-4"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-col gap-1">
                            <label htmlFor="photo">
                                Photo
                                <span className="text-sm text-gray-500">
                                    (required)
                                </span>
                            </label>
                            <div>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    {...register('photo', {
                                        required: 'Photo is required',
                                    })}
                                />
                            </div>
                            <ErrorMessage
                                errors={errors}
                                name="photo"
                                render={({ message }) => (
                                    <p className="text-sm text-red-500">
                                        {message}
                                    </p>
                                )}
                            />
                        </div>

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
                        <div className="grid grid-cols-2 gap-x-1">
                            <DialogTrigger asChild>
                                <Button variant="outline" className="w-full">
                                    Cancel
                                </Button>
                            </DialogTrigger>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={uploadPhotoMutation.isPending}
                            >
                                {uploadPhotoMutation.isPending
                                    ? 'Uploading...'
                                    : 'Submit'}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
