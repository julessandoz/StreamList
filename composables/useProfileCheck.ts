import type { User } from "@supabase/supabase-js";
import type { UserProfile } from "~/types/UserProfile";

export async function useProfileCheck(): Promise<boolean> {
  try {
    const supabaseUser = useSupabaseUser();
    const authStore = useAuthStore();
    const storedUser = authStore.getUser;
    let user = storedUser.user;
    const profile = storedUser.profile;

    //   if not logged in -> return false
    if (!supabaseUser.value) {
      authStore.clearUser();
      return false;
    }

    // if user not stored -> add to store
    if (!user) {
      authStore.setUser(supabaseUser.value);
      user = supabaseUser.value;
    }

    //   if user id doesn't match signed in user -> fix
    if (user?.id != supabaseUser.value.id) {
      authStore.setUser(supabaseUser.value);
      user = supabaseUser.value;
    }

    //   if profile id doesn't match signed in user -> check if profile exist and fix+return accordingly
    if (profile?.auth_user_id != supabaseUser.value.id) {
      const userProfile = await getProfile(supabaseUser.value);
      if (userProfile) {
        authStore.setProfile(userProfile);
        return true;
      } else {
        return false;
      }
    }

    if (profile) {
      return true;
    }

    if (!profile) {
      const userProfile = await getProfile(supabaseUser.value);
      if (userProfile) {
        authStore.setProfile(userProfile);
        return true;
      } else {
        return false;
      }
    }
    return false;
  } catch (error) {
    console.error(
      "An error has occured checking if user has a profile: ",
      error
    );
    return false;
  }
}

async function getProfile(user: User): Promise<UserProfile | null> {
  const supabase = useSupabaseClient();
  try {
    const { error, data } = await supabase
      .from("Users")
      .select()
      .eq("auth_user_id", user.id);
    if (data && data[0]) {
      return data[0] as UserProfile;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
