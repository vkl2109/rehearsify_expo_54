import { SetList } from '@/constants/types'
import { create } from 'zustand'

interface SetListStoreState {
    setLists: SetList[],
    addSetList: (newData: SetList[]) => void,
    clearAllSetLists: () => void,
}

const useSetListStore = create<SetListStoreState>()((set) => ({
    setLists: [],
    addSetList: (newSetList: SetList[]) => set({
        setLists: newSetList,
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
}

