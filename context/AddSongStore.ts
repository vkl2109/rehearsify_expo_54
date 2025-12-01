import { create } from "zustand";


interface AddSongStore {
    step: number;
    title: string;
    artist: string;
    songType: string;
    minutes: number;
    seconds: number;
    key: string;
    bpm: number;
    setTitleArtist: (title: string, artist: string, songType: string) => void;
    backStep: () => void;
    setMinutesSecondsKeyBpm: (minutes: number, seconds: number, key: string, bpm: number) => void;
    clearStore: () => void;
}

const useAddSongStore = create<AddSongStore>()((set) => ({
    step: 0,
    title: '',
    artist: '',
    songType: 'Original',
    minutes: 0,
    seconds: 0,
    key: '',
    bpm: 0,
    setMinutesSecondsKeyBpm: (minutes: number, seconds: number, key: string,  bpm: number) => set({
        minutes: minutes,
        seconds: seconds,
        key: key,
        bpm: bpm,
        step: 2
    }),
    setTitleArtist: (title: string, artist: string, songType: string) => set({
        title: title,
        artist: artist,
        songType: songType,
        step: 1
    }),
    backStep: () => set((state) => ({
        step: Math.max(0, state.step - 1), // prevents negative
    })),
    clearStore: () => set({
        step: 0,
        title: '',
        artist: '',
        songType: 'Original',
        minutes: 0,
        seconds: 0,
        key: '',
        bpm: 0,
    }),
}))

export {
    useAddSongStore
};
