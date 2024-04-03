<template>
  <input
    type="checkbox"
    :name="props.streamingService"
    :id="props.streamingService"
    @change="$emit('streamingServiceSelected', props.streamingService)"
  />
  <label :for="props.streamingService" class="streaming-service-picker"
    ><IconCSS :name="props.icon" size="24px" class="streaming-icon" />
    <span class="streaming-service-name">{{ props.streamingService }}</span></label
  >
</template>

<script setup lang="ts">
const props = defineProps<{
  streamingService: string;
  icon: string;
}>();
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables.scss";

input[type="checkbox"] {
  display: none;
}

.streaming-service-picker {
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.5em 0.75em 0.5em 0.5em;
  border: 2px solid $fontColor;
  border-radius: 10px;
  color: $fontColor;
  background-color: $bgColor;
  cursor: pointer;
}

input[type="checkbox"]:checked + .streaming-service-picker {
  background-color: $accentColor;
  border-color: $accentColor;
}

.streaming-service-name {
  font-family: $bodyFont;
  font-size: $pSize;
}
</style>
