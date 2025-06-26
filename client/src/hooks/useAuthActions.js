import http from "../api/http";
import { useAuthStore } from "../store/authStore";

export function useAuthActions() {
  const { setUser, logout } = useAuthStore();
  const fetchProfile = async () => {
    try {
      const response = await http.get("/user/profile");
      if (response.status === 200) {
        setUser(response.data.metadata);
      } else {
        logout();
      }
    } catch (error) {
      console.log(error);
      logout();
    }
  };

  return { fetchProfile };
}
