import { Song } from '@/constants/types'
import { create } from 'zustand'

interface SongStoreState {
    songs: Song[],
    addSongs: (newData: Song[]) => void,
    clearAllSongs: () => void,
}

const useSongStore = create<SongStoreState>()((set) => ({
    songs: [],
    addSongs: (newSongs: Song[]) => set({
        songs: newSongs,
    }),
    clearAllSongs: () => set({
        songs: [],
    })
}))

interface CurrentSongState {
    currentSong: Song | undefined,
    setCurrentSong: (newData: Song) => void,
    removeCurrentSong: () => void,
}

const currentSongStore = create<CurrentSongState>()((set) => ({
    currentSong: undefined,
    setCurrentSong: (newSong: Song) => set({
        currentSong: newSong
    }),
    removeCurrentSong: () => set({
        currentSong: undefined
    })
}))

export { currentSongStore, useSongStore }

