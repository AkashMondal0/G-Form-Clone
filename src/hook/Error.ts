import { create } from 'zustand';

interface LoadingStore {
    isLoading: boolean;
    startLoading: () => void;
    stopLoading: () => void;
}

const editPageLoading = create<LoadingStore>((set) => ({
    isLoading: false,
    startLoading: () => set({ isLoading: true }),
    stopLoading: () => set({ isLoading: false }),
}));

const ViewPageLoading = create<LoadingStore>((set) => ({
    isLoading: false,
    startLoading: () => set({ isLoading: true }),
    stopLoading: () => set({ isLoading: false }),
}));

// export { editPageLoading };