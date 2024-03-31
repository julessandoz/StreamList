<template>
  <input
    type="checkbox"
    :name="props.text"
    :id="props.text"
    @change="$emit('pillChecked')"
  />
  <label :for="props.text" class="pill">{{ props.text }}</label>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string;
}>();
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables.scss";

.pill {
  border: solid 2px $fontColor;
  border-radius: 20px;
  background-color: $bgColor;
  padding: 0.5em 1em;
  color: $fontColor;
  margin: 0.5em;
  cursor: pointer;

  &:hover {
    background-color: $bgColorHover;
    color: $fontColor;
  }
}

input[type="checkbox"] {
  display: none;
}

input[type="checkbox"]:checked + label {
  background-color: $fontColor;
  color: $bgColor;

  &:hover {
    background-color: $fontColorHover;
  }
}
</style>
