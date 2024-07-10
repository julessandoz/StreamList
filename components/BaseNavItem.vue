<template>
  <div class="nav-item">
    <Icon :name="props.iconName" class="nav-icon" :aria-label="props.iconName" />
    <p class="nav-label">{{ props.label }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  iconName: string;
  label?: string;
}>();
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables.scss";

.collapsed .nav-item .nav-label {
  display: none;
}

.nav-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  height: 70px;
  padding-inline: 20px;

  &.active,
  &:not(.active):hover {
    color: $accentColor;
  }

  .nav-icon {
    font-size: 60px;
  }
}

@media (max-width: 768px) {
  .nav-item {
    flex-direction: column;
    gap: 3px;

    &:not(.active):hover {
      color: $fontColor;
    }

    .nav-icon {
      font-size: 50px;
    }

    .nav-label {
      margin: 0;
      font-size: $smallTextSize;
      font-weight: $bodyRegular;
    }
  }

  .collapsed .nav-item .nav-label {
    display: block;
  }
}
</style>
