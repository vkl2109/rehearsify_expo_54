import { create } from "zustand"


interface ReorderSetlistStoreState {
    reorderedSongIds: string[],
    setReorderedSongIds: (newData: string[]) => void,
    clearReorderedSongIds: () => void,
}

const useReorderSetlistStore = create<ReorderSetlistStoreState>()((set) => ({
    reorderedSongIds: [],
    setReorderedSongIds: (newReorderedSongIds: string[]) => set({
        reorderedSongIds: newReorderedSongIds,
    }),
    clearReorderedSongIds: () => set({
        reorderedSongIds: [],
    })
}))

export { useReorderSetlistStore }
