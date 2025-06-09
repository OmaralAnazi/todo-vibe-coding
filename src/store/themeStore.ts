import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeStore, ThemeMode } from '@/types/theme';

const initialState = {
  mode: 'light' as ThemeMode,
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      toggleTheme: () => {
        set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' }));
      },
      setTheme: (mode) => set({ mode }),
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({ mode: state.mode }),
    }
  )
); 