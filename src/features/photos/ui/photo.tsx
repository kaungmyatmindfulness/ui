import { useState } from 'react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'

interface PhotoProps {
    id: string
}

export default function Photo({ id }: PhotoProps) {
    const [isError, setIsError] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setRetryCount] = useState(0)

    const handleRetry = () => {
        setIsError(false)
        setRetryCount((prev) => prev + 1)
    }

    return (
        <>
            {isError ? (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                    <span>Error loading image.</span>
                    <Button size="sm" onClick={handleRetry}>
                        Try again
                    </Button>
                </div>
            ) : (
                <div className="relative h-full w-full">
                    <Image
                        src={`http://localhost:3003/photos/${id}`}
                        alt="Uploaded Photo"
                        onError={() => setIsError(true)}
                        fill
                        className="object-cover"
                    />
                </div>
            )}
        </>
    )
}
