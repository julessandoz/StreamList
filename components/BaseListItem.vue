<template>
  <div class="list-item">
    <div class="list-item-image">
      <NuxtImg
        :src="props.image"
        alt="Movie poster"
        :class="props.type === 'User' ? 'rounded' : 'square'"
      />
    </div>
    <p class="list-item-title">{{ props.title }}</p>
    <p class="list-item-type">{{ props.type }}</p>
    <p class="list-item-year">{{ props.year }}</p>
    <IconCSS :name="props.icon" size="24px" class="list-item-icon" v-if="props.icon" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  image: string;
  type: "User" | "Movie" | "TV Show" | "Watchlist";
  year: string | null;
  icon: string | null;
}>();
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables.scss";

.list-item {
  font-family: $bodyFont;
  margin: 0 50px;
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 6fr 3fr 3fr 1fr;
  gap: 1em;
  color: $fontColor;
  overflow: hidden;

  &:hover {
    background-color: $bgColorHover;
  }
}

.list-item-image {
  max-height: 50px;
  height: 100%;
  align-self: baseline;
  img {
    height: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    &.rounded {
      border-radius: 50%;
    }
  }
}

.list-item-title {
  justify-self: start;
}

.list-item-type,
.list-item-year {
  font-size: $itemDetailsSize;
  font-weight: $bodyLight;
  justify-self: center;
}
.list-item-icon {
  justify-self: end;
}
</style>
