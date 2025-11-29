import { create } from "zustand";

interface AddSongToSetlistStore {
    songsToAdd: Set<string>;
    addSong: (songId: string) => void;
    removeSong: (songId: string) => void;
    clearSongs: () => void;
    songInSet: (songId: string) => boolean;
}

const useAddSongToSetlistStore = create<AddSongToSetlistStore>()((set, get) => ({
    songsToAdd: new Set<string>(),
    addSong: (songId: string) => set((state) => {
        const newSet = new Set(state.songsToAdd);
        newSet.add(songId);
        return { songsToAdd: newSet };
    }),
    removeSong: (songId: string) => set((state) => {
        const newSet = new Set(state.songsToAdd);
        newSet.delete(songId);
        return { songsToAdd: newSet };
    }),
    clearSongs: () => set({ songsToAdd: new Set<string>() }),
    songInSet: (songId: string) => {
        return get().songsToAdd.has(songId);
    }
}))

export {
    useAddSongToSetlistStore
};
