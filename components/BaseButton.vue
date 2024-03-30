<template>
  <button :class="`btn ${btnStyle} ${btnColor}`">
    <IconCSS v-if="props.icon" class="btn-icon" :name="props.icon" :size="iconSize" />
    <span v-if="props.text" class="btn-text">
      {{ props.text }}
    </span>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  text: string | null;
  icon: string | null;
  size: "sm" | "md" | "lg";
  type: "outline" | "filled";
  color: "default" | "accent";
}>();

const iconSizing = {
  sm: props.text ? "18px" : "24px",
  md: props.text ? "24px" : "36px",
  lg: props.text ? "36px" : "48px",
};

const textSizing = {
  sm: "16px",
  md: "20px",
  lg: "30px",
};

console.log(props);

const iconSize = iconSizing[props.size];
const textSize = textSizing[props.size];
const btnStyle = props.type === "outline" ? "btn-outline" : "btn-filled";
const btnColor = props.color === "default" ? "btn-default" : "btn-accent";
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables.scss";
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  padding: 0.75em 1em 0.75em 0.75em;
  border: none;
  border-radius: 10px;
  color: $bgColor;
  background-color: $fontColor;
  cursor: pointer;
}

.btn-outline {
  color: $fontColor;
  background-color: transparent;
  border: 2px solid $fontColor;

  &.btn-accent {
    color: $accentColor;
    border-color: $accentColor;
  }
}

.btn-filled {
  color: $bgColor;
  background-color: $fontColor;

  &.btn-accent {
    color: $fontColor;
    background-color: $accentColor;
  }
}

.btn-text {
  min-width: fit-content;
  font-size: v-bind(textSize);
}
</style>
