import { SongToSetList } from '@/constants/types';
import { create } from 'zustand';

interface SongToSetListStoreState {
    songsToSetLists: SongToSetList[];
    replaceSongsToSetLists: (newData: SongToSetList[]) => void;
    updateSongsToSetLists: (newData: SongToSetList[]) => void;
    clearAllSongsToSetLists: () => void;
}

const useSongToSetListStore = create<SongToSetListStoreState>()((set, get) => ({
    songsToSetLists: [],
    replaceSongsToSetLists: (newData: SongToSetList[]) => set({
        songsToSetLists: newData
    }),
    updateSongsToSetLists: (newData: SongToSetList[]) => {
        const current = get().songsToSetLists;

        // Create a map keyed by songId_setlistId to deduplicate
        const map = new Map<string, SongToSetList>();
        
        // Add current songs first
        current.forEach(j => map.set(`${j.songId}_${j.setlistId}`, j));

        // Add/overwrite with new songs
        newData.forEach(j => map.set(`${j.songId}_${j.setlistId}`, j));

        // Update store with merged unique array
        set({ songsToSetLists: Array.from(map.values()) });
    },

    clearAllSongsToSetLists: () => set({ songsToSetLists: [] }),
}));

export { useSongToSetListStore };
