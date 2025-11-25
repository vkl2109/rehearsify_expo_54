import { SetList } from '@/constants/types';
import { db } from '@/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { create } from 'zustand';

interface SetListStoreState {
    setLists: SetList[],
    addSetLists: (newData: string) => void,
    clearAllSetLists: () => void,
}

const useSetListStore = create<SetListStoreState>()((set) => ({
    setLists: [],
    addSetLists: async (bandId: string) => {
        const currentBandSetListsQuery = query(collection(db, "setlists"), where("bandId", "==", bandId));
        const currentBandSetListSnaps = await getDocs(currentBandSetListsQuery);
        const currentBandSetLists: SetList[] = []
        currentBandSetListSnaps.forEach(doc => {
        const data = doc.data()
        const serializedSetList: SetList = {
            id: doc.id,
            name: data.name,
            bandId: data.bandId,
            createdAt: data.createdAt,
            createdBy: data.createdBy,
        }
        currentBandSetLists.push(serializedSetList)
        })
        set({ setLists: currentBandSetLists })
    },
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

