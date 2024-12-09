import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setAccessToken: (accessToken) => set({ accessToken }),
      clearUser: () => set({ user: null, accessToken: null, isAuthenticated: false }),
    }),
    {
      name: "user-store", // localStorage에 저장될 키 이름
      getStorage: () => localStorage, // 사용할 스토리지 (기본값: localStorage)
      onRehydrateStorage: () => (state) => {
        // 상태 복원 후 인증 상태 설정
        const user = state?.user;
        const accessToken = state?.accessToken;
        state.isAuthenticated = !!(user && accessToken);
      },
    }
  )
);

export default useUserStore;
