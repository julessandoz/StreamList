<template>
  <h1>Welcome to StreamList</h1>
  <p>
    Now that you've created an account please complete your profile in order to use the
    app!
  </p>

  <TheProfileUpdateForm />
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const user = authStore.getUser;
console.log(user);
if (user.profile) {
  navigateTo("/home");
}
</script>
