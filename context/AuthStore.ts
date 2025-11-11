import { create } from 'zustand'

interface authState {
    UID: string,
    logInUser: (newData: string) => void,
    logOutUser: () => void,
}

const useAuthStore = create<authState>()((set) => ({
    UID: '',
    logInUser: (newUID: string) => set({
        UID: newUID,
    }),
    logOutUser: () => set({
        UID: '',
    })
}))

export {
    useAuthStore
}
