'use client'
import { getMetadataById } from '@/features/metadata/service/metadata.service'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

function Tag({ tag }: { tag: string }) {
    return (
        <span className="inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            {tag}
        </span>
    )
}

interface MetadataProps {
    id: string
}

export default function Metadata({ id }: MetadataProps) {
    const { data: metadata } = useQuery({
        queryKey: ['metadata', { id }],
        queryFn: () => getMetadataById(id),
    })

    return (
        <div>
            <h2 className="text-lg font-semibold">Meta Data</h2>
            <div className="flex flex-col">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-bold">Updated At:</span>
                    <span>
                        {metadata?.updatedAt
                            ? format(metadata?.updatedAt, 'PPPP')
                            : 'N/A'}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-bold">Tags:</span>
                    <div className="flex gap-1">
                        {metadata?.tags && metadata.tags.length !== 0
                            ? metadata.tags.map((tag, index) => (
                                  <Tag key={index} tag={tag} />
                              ))
                            : 'No tags available'}
                    </div>
                </div>
            </div>
        </div>
    )
}
