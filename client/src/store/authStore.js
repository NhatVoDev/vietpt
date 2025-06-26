import { create } from "zustand";

// Lấy trạng thái ban đầu từ localStorage
const initialToken = localStorage.getItem("accessToken");
let initialUser = null;
try {
  initialUser = JSON.parse(localStorage.getItem("user"));
} catch (error) {
  initialUser = null;
}

export const useAuthStore = create((set) => ({
  isAuthenticated: !!initialToken,
  user: initialUser,
  token: initialToken,
  login: (user, token) => {
    set({ isAuthenticated: true, user, token });
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user)); // Lưu cả user vào localStorage
  },
  logout: () => {
    set({ isAuthenticated: false, user: null, token: null });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
  },
  setUser: (user) => {
    set((state) => {
      const updatedUser = { ...state.user, ...user };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return { user: updatedUser };
    });
  },
  setIsAuthenticated: (isAuthenticated) => {
    set({ isAuthenticated });
  },
}));
