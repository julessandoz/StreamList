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
const user = useSupabaseUser();
const userHasProfile = await useProfileCheck();
// get current route
const currentRoute = useRoute();
console.log(currentRoute.path);

if (user.value && !userHasProfile && currentRoute.path !== "/completeProfile") {
  navigateTo("/completeProfile");
}
</script>
