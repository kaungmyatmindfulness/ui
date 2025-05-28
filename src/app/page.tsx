import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
import { getPhotos } from '@/features/photos/service/photo.service'
import PhotoList from '@/features/photos/ui/photo-list'
import PhotoUploadDialog from '@/features/photos/ui/photo-upload-dialog'

export default async function Home() {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['posts'],
        queryFn: getPhotos,
    })

    return (
        <>
            <div className="flex flex-col items-center gap-y-4">
                <div>
                    <h1 className="mt-10 text-center text-4xl font-bold">
                        Photos
                    </h1>
                    <p className="mt-4 text-center">
                        List of photos from the local API.
                    </p>
                </div>
                <PhotoUploadDialog />
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <PhotoList />
                </HydrationBoundary>
            </div>
        </>
    )
}
