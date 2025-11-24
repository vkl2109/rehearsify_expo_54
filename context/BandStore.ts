import { Band, BandMember } from '@/constants/types'
import { create } from 'zustand'

interface bandState {
    band: Band | null,
    members: BandMember[],
    setBand: (newData: Band) => void,
    clearBand: () => void,
}

const useBandStore = create<bandState>()((set) => ({
    band: null,
    members: [],
    setBand: (newBand: Band) => set({
        band: newBand,
    }),
    setMembers: (newMembers: BandMember[]) => set({
        members: newMembers,
    }),
    clearBand: () => set({
        band: null,
        members: []
    })
}))

export {
    useBandStore
}
