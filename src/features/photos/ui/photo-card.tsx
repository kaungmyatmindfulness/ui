import Link from 'next/link'

import { Button } from '@/components/ui/button'
import Photo from '@/features/photos/ui/photo'

interface PhotoProps {
    id: string
}

export default function PhotoCard({ id }: PhotoProps) {
    return (
        <div className="flex h-60 w-full flex-col items-center justify-center overflow-clip rounded-lg bg-gray-200">
            <div className="h-56 w-full border-b border-gray-300">
                <Photo id={id} />
            </div>
            <Button asChild variant="ghost">
                <Link href={`/photos/${id}`}>View details</Link>
            </Button>
        </div>
    )
}
