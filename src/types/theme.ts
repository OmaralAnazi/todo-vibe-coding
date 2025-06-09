export type ThemeMode = 'light' | 'dark';

export interface ThemeState {
  mode: ThemeMode;
}

export interface ThemeStore extends ThemeState {
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
} 