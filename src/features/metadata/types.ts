export interface Metadata {
    updatedAt?: string | null
    tags?: string[] | null
}

export interface EditMetadata {
    metadata: Metadata
}
