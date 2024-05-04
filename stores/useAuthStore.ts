import { defineStore } from "pinia";
import type { User } from "@supabase/supabase-js"
import type { UserProfile } from "~/types/UserProfile"; 
interface AuthState {
  user: User | null;
  profile: UserProfile | null
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    profile: null
  }),
  getters: {
    getUser():{user: User | null, profile: UserProfile | null} {
        return {user: this.user, profile: this.profile} 
    }
  },
  actions: {
    setUser(authUser: User, profile: UserProfile) {
      this.user = authUser;
      this.profile = profile
    },
    setProfile(profile: UserProfile){
      this.profile = profile;
    },
    clearUser() {
      this.user = null;
      this.profile = null
    },
  },
});
