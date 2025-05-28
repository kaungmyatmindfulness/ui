import { GetPhotosResponse, UploadPhotoRequest } from '@/features/photos/types'

const URLs = {
    uploadPhoto: '/api/photos',
    getPhotos: '/api/photos',
    getPhotoById: (id: string) => `/api/photos/${id}`,
    deletePhotoById: (id: string) => `/api/photos/${id}`,
}

export function uploadPhoto(request: UploadPhotoRequest): Promise<unknown> {
    const formData = new FormData()
    formData.append('photo', request.photo)
    formData.append('metadata', JSON.stringify(request.metadata))

    return fetch(URLs.uploadPhoto, {
        method: 'POST',
        body: formData,
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`Failed to upload photo: ${response.statusText}`)
        }
        return response.json()
    })
}

export function getPhotos(): Promise<GetPhotosResponse> {
    return fetch(URLs.getPhotos, {
        method: 'GET',
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`Failed to fetch photos: ${response.statusText}`)
        }
        return response.json() as Promise<GetPhotosResponse>
    })
}

export function getPhotoById(id: string): Promise<unknown> {
    return fetch(URLs.getPhotoById(id), {
        method: 'GET',
    }).then((response) => {
        if (!response.ok) {
            throw new Error(
                `Failed to fetch photo by id: ${response.statusText}`
            )
        }
        return response.blob()
    })
}

export function deletePhotoById(id: string): Promise<unknown> {
    return fetch(URLs.deletePhotoById(id), {
        method: 'DELETE',
    }).then((response) => {
        if (!response.ok) {
            throw new Error(
                `Failed to delete photo by id: ${response.statusText}`
            )
        }
        return response.json()
    })
}
