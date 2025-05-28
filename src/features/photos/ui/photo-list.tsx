'use client'
import { getPhotos } from '@/features/photos/service/photo.service'
import PhotoCard from '@/features/photos/ui/photo-card'
import { useQuery } from '@tanstack/react-query'

export default function PhotoList() {
    const { data: photos } = useQuery({
        queryKey: ['photos'],
        queryFn: getPhotos,
    })

    return (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {photos?.map((photo) => <PhotoCard key={photo} id={photo} />)}
        </div>
    )
}
