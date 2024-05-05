<script setup lang="ts">
import type { SupabaseClient } from "@supabase/supabase-js";
import type { UserProfile } from "~/types/UserProfile";
import type { Database } from "~/types/supabase";

const supabase: SupabaseClient<Database> = useSupabaseClient();
const user = useSupabaseUser();
const userProfile: Ref<UserProfile> = ref({
  auth_user_id: "",
  username: "",
  profilePic: "",
});
const authStore = useAuthStore();

async function checkIfReturning(userId: string): Promise<boolean | void> {
  try {
    const { data, error } = await supabase
      .from("Users")
      .select()
      .eq("auth_user_id", userId);

    if (error) {
      throw new Error(`Error: ${error}`);
    }
    if (data[0]) {
      userProfile.value = data[0] as UserProfile;
      authStore.setProfile(userProfile.value);
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return;
  }
}
watch(
  user,
  async () => {
    if (user.value) {
      if (await checkIfReturning(user.value.id)) {
        authStore.setUserAndProfile(user.value, userProfile.value);
        return navigateTo("/landing");
      }
      return navigateTo("/completeProfile");
    }
  },
  { immediate: true }
);
</script>

<template></template>
