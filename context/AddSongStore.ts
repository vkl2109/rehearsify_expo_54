import { create } from "zustand";


interface AddSongStore {
    step: number,
    title: string;
    artist: string;
    setTitleArtist: (title: string, artist: string) => void;
}

const useAddSongStore = create<AddSongStore>()((set) => ({
    step: 0,
    title: '',
    artist: '',
    setTitleArtist: (title: string, artist: string) => set({
        title: title,
        artist: artist,
        step: 1,
    }),
}))

export {
    useAddSongStore
};
