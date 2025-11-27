import { SongToSetList } from '@/constants/types';
import { create } from 'zustand';

interface SongToSetListStoreState {
    songsToSetLists: SongToSetList[],
    addSongsToSetLists: (newData: SongToSetList[]) => void,
    clearAllSongsToSetLists: () => void,
}

const useSongToSetListStore = create<SongToSetListStoreState>()((set) => ({
    songsToSetLists: [],
    addSongsToSetLists: async (newSongsToSetLists: SongToSetList[]) => set({ 
        songsToSetLists: newSongsToSetLists 
    }),
    clearAllSongsToSetLists: () => set({
        songsToSetLists: [],
    })
}))

export {
    useSongToSetListStore
};
