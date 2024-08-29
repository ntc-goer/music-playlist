interface Playlist {
    id: string
    name: string
    thumbnailPath: string
    songList: string[]
    createdAt: Date
    updatedAt?: Date
}

export {
    type Playlist
}