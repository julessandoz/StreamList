<template>
  <div>
    <BaseButton
      class="sign-in-btn"
      text="Sign In"
      size="sm"
      btnStyle="filled"
      type="button"
      color="accent"
    />
  </div>
  <slot />
  <TheFooter />
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.sign-in-btn {
  position: fixed;
  top: 30px;
  right: 30px;
}
</style>
