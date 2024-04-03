<template>
  <div class="suggestion-item">
    <BaseSkeletonLoader height="180px" width="180px" />
    <BaseSkeletonLoader height="1em" width="180px" />
    <BaseSkeletonLoader height="1em" width="90px" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.suggestion-item {
  padding: 15px 10px 0px 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}
</style>
