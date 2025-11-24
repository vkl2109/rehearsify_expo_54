import { User } from '@/constants/types'
import { create } from 'zustand'

interface authState {
    UID: string,
    user: User | null,
    logInUser: (newData: string) => void,
    updateUser: (newUser: User) => void,
    logOutUser: () => void,
}

const useAuthStore = create<authState>()((set) => ({
    UID: '',
    user: null,
    logInUser: (newUID: string) => set({
        UID: newUID,
    }),
    updateUser: (newUser: User) => set({
        user: newUser,
    }),
    logOutUser: () => set({
        UID: '',
        user: null,
    })
}))

export {
    useAuthStore
}
