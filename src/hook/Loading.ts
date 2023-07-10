import { create } from 'zustand';

interface LoadingStore {
    isLoading: boolean;
    startLoading: () => void;
    stopLoading: () => void;
}

const useLoading = create<LoadingStore>((set) => ({
    isLoading: false,
    startLoading: () => set({ isLoading: true }),
    stopLoading: () => set({ isLoading: false }),
}));

export default useLoading;