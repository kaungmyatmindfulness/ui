interface UploadPhotoMetaData {
    updatedAt: string
    tags: string[]
}

export interface UploadPhotoRequest {
    photo: Blob
    metadata: UploadPhotoMetaData
}

export type GetPhotosResponse = string[]
