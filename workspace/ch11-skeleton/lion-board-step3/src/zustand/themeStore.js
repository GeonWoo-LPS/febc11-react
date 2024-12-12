import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

const ThemeStore = (set) => ({
  isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches
    ? true
    : false,
  toggleTheme: () => set((state) => ({isDarkMode: !state.isDarkMode})),
});

// const useUserStore = create(UserStore) // 스토리지를 사용하지 않을 경우

// 스토리지를 사용할 경우
const useThemeStore = create(
  persist(ThemeStore, {
    name: 'themeStore',
    // storage: createJSONStorage(), // 기본은 localStorage
  })
);

export default useThemeStore;
