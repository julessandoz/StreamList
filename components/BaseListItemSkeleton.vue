<template>
  <div class="list-item-placeholder">
    <div class="list-item-image-placeholder">
      <BaseSkeletonLoader height="50px" width="50px" />
    </div>
    <div class="list-item-details-placeholder">
      <BaseSkeletonLoader height="1em" width="100%" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import "~/assets/scss/variables.scss";

.list-item-placeholder {
  margin: 0 50px;
  padding: 0 15px 0 0;
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 10fr;
  gap: 1em;
  overflow: hidden;
}
</style>
