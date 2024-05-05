<template>
  <NuxtLayout>
    <main>
      <NuxtPage />
    </main>
  </NuxtLayout>
</template>

<style scoped>
main {
  margin-inline: 50px;
}
</style>

<script lang="ts" setup>
import type { UserProfile } from "./types/UserProfile";

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const authStore = useAuthStore();
const userProfile: Ref<UserProfile | null> = ref(null);

if (user.value) {
  if (!authStore.getUser.profile) {
    try {
      const { data, error } = await supabase
        .from("Users")
        .select()
        .eq("auth_user_id", user.value.id);
      if (error) {
        throw error;
      }
      if (data[0]) {
        userProfile.value = data[0];
        authStore.setUser(user.value, userProfile.value);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
</script>
