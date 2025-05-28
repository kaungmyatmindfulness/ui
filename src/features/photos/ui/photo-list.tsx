'use client'
import { getPhotos } from '@/features/photos/service/photo.service'
import PhotoCard from '@/features/photos/ui/photo-card'
import { useQuery } from '@tanstack/react-query'

export default function PhotoList() {
    const { data: photos, error } = useQuery({
        queryKey: ['photos'],
        queryFn: getPhotos,
    })

    return (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {error && (
                <div className="col-span-full text-center text-red-500">
                    An error occurred while fetching photos.
                </div>
            )}
            {photos?.length === 0 && (
                <div className="col-span-full text-center text-gray-500">
                    No photos available.
                </div>
            )}
            {photos?.map((photo) => <PhotoCard key={photo} id={photo} />)}
        </div>
    )
}
