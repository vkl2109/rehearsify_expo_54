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

export {
    useSetListStore
}
