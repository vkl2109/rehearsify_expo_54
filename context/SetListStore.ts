import { SetList } from '@/constants/types';
import { create } from 'zustand';

interface SetListStoreState {
    setLists: SetList[],
    addSetLists: (newData: SetList[]) => void,
    clearAllSetLists: () => void,
}

const useSetListStore = create<SetListStoreState>()((set) => ({
    setLists: [],
    addSetLists: async (newSetLists: SetList[]) => set({ 
        setLists: newSetLists 
    }),
    clearAllSetLists: () => set({
        setLists: [],
    })
}))

interface CurrentSetListState {
    currentSetList: SetList | undefined,
    setCurrentSetList: (newData: SetList) => void,
    removeCurrentSetList: () => void,
}

const currentSetListStore = create<CurrentSetListState>()((set) => ({
    currentSetList: undefined,
    setCurrentSetList: (newSetList: SetList) => set({
        currentSetList: newSetList
    }),
    removeCurrentSetList: () => set({
        currentSetList: undefined
    })
}))

export {
    currentSetListStore, useSetListStore
};

