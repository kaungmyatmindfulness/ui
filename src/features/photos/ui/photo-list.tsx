'use client'
import { getPhotos } from '@/features/photos/service/photo.service'
import Photo from '@/features/photos/ui/photo'
import { useQuery } from '@tanstack/react-query'

export default function PhotoList() {
    const { data: photos } = useQuery({
        queryKey: ['photos'],
        queryFn: getPhotos,
    })
    console.log('📝 -> PhotoList -> photos:', photos)

    return (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* Placeholder for photo items */}
            {Array.from({ length: 12 }).map((_, index) => (
                <div
                    key={index}
                    className="flex h-48 items-center justify-center rounded-lg bg-gray-200"
                >
                    <Photo key={index} />
                </div>
            ))}
        </div>
    )
}
