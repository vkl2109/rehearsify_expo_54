import { User } from '@/constants/types';
import { create } from 'zustand';

interface userState {
    users: Record<string, User>,
    getUserById: (userId: string) => User | null,
    setUser: (newUser: User) => void,
}

const useUserStore = create<userState>()((set, get) => ({
    users: {},
    getUserById: (userId: string) => {
        return get().users[userId] || null;
    },
    setUser: (newUser: User) => set((state) => ({
        users: {
            ...state.users,
            [newUser.uid]: newUser,
        }
    })),
}))

export {
    useUserStore
};

