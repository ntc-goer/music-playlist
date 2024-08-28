interface MusicTrack {
    id: string
    name: string
    artist: string
    album: string
    releaseYear: number
    songFileName: string
    thumbnailName: string
    genre: string
    duration: number
    createdAt: Date
    updatedAt?: Date
}

export {
    type MusicTrack
}