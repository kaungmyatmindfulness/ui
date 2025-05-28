import { Metadata } from '@/features/metadata/types'

const URLs = {
    getMetadataById: (id: string) => `/api/metadata/${id}`,
    updateMetadataById: (id: string) => `/api/metadata/${id}`,
}

export function getMetadataById(id: string): Promise<Metadata> {
    return fetch(URLs.getMetadataById(id), {
        method: 'GET',
    }).then((response) => {
        if (!response.ok) {
            throw new Error(
                `Failed to fetch metadata by id: ${response.statusText}`
            )
        }
        return response.json() as Promise<Metadata>
    })
}

export function updateMetadataById(
    id: string,
    metadata: Metadata
): Promise<Metadata> {
    return fetch(URLs.updateMetadataById(id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(metadata),
    }).then((response) => {
        if (!response.ok) {
            throw new Error(
                `Failed to update metadata by id: ${response.statusText}`
            )
        }
        return response.json() as Promise<Metadata>
    })
}
