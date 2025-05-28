interface UploadPhotoMetaData {
    updatedAt: string
    tags: string[]
}

export interface UploadPhotoRequest {
    photo: File
    metadata: UploadPhotoMetaData
}

export type GetPhotosResponse = string[]
