'use client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { deletePhotoById } from '@/features/photos/service/photo.service'
import { useMutation } from '@tanstack/react-query'

export default function PhotoDeleteButton({ id }: { id: string }) {
    const router = useRouter()

    const deletePhotoMutation = useMutation({
        mutationFn: () => deletePhotoById(id),
        onSuccess: () => {
            toast.success('Photo deleted successfully')
            router.push('/')
        },
        onError: (error) => {
            toast.error(`Error deleting photo: ${error.message}`)
        },
    })

    return (
        <Button
            variant="destructive"
            onClick={() => deletePhotoMutation.mutate()}
        >
            Delete Photo
        </Button>
    )
}
