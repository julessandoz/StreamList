<template>
  <h1>Welcome to StreamList</h1>
  <p>
    Now that you've created an account please complete your profile in order to use the
    app!
  </p>

  <TheProfileUpdateForm />
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const userHasProfile = await useProfileCheck();

console.log(user.value);

if (!user.value) {
  navigateTo("/login");
}

if (userHasProfile) {
  navigateTo("/home");
}
</script>
