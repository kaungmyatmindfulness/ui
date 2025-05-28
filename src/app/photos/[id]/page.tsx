import { Button } from '@/components/ui/button'
import { getMetadataById } from '@/features/metadata/service/metadata.service'
import Metadata from '@/features/metadata/ui/metadata'
import Photo from '@/features/photos/ui/photo'
import PhotoDeleteButton from '@/features/photos/ui/photo-delete-button'
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'

export default async function PhotoDetailsPage({
    params,
}: {
    params: { id: string }
}) {
    const { id } = params

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['metadata', { id }],
        queryFn: () => getMetadataById(id!),
    })

    return (
        <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Photo Details Page
            </h1>
            <div className="mt-4 flex flex-col gap-6 md:flex-row">
                <div>
                    <div className="h-80 w-80 overflow-clip rounded-2xl">
                        <Photo id={id} />
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                        <PhotoDeleteButton id={id} />
                        <Button variant="outline">Edit Metadata</Button>
                    </div>
                </div>
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <Metadata id={id} />
                </HydrationBoundary>
            </div>
        </div>
    )
}
