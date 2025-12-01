import { SongToSetList } from '@/constants/types';
import { create } from 'zustand';

interface SongToSetListStoreState {
    songsToSetLists: SongToSetList[];
    replaceSongsToSetLists: (newData: SongToSetList[]) => void;
    updateSongsToSetLists: (newData: SongToSetList[], currentSetListId: string) => void;
    clearAllSongsToSetLists: () => void;
    currentOpenSongId: string;
    setCurrentOpenSongId: (songId: string) => void;
}

const useSongToSetListStore = create<SongToSetListStoreState>()((set, get) => ({
    songsToSetLists: [],
    replaceSongsToSetLists: (newData: SongToSetList[]) => set({
        songsToSetLists: newData
    }),
    updateSongsToSetLists: (newData: SongToSetList[], currentSetListId: string) => {
        const current = get().songsToSetLists;
        const filteredCurrent = current.filter(j => j.setlistId !== currentSetListId);

        // Create map for deduplication
        const map = new Map<string, SongToSetList>();
        filteredCurrent.forEach(j => map.set(`${j.songId}_${j.setlistId}`, j));
        newData.forEach(j => map.set(`${j.songId}_${j.setlistId}`, j));

        // Update store
        set({ songsToSetLists: Array.from(map.values()) });
    },

    clearAllSongsToSetLists: () => set({ songsToSetLists: [] }),
    currentOpenSongId: '',
    setCurrentOpenSongId: (songId: string) => set({ currentOpenSongId: songId })
}));

export { useSongToSetListStore };
