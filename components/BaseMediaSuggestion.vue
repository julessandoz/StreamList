<template>
  <div class="suggestion-item" @click="$emit('sugggestionClicked', props.tmdbId)">
    <NuxtImg
      :id="`suggestion-${props.tmdbId}`"
      class="suggestion-image"
      provider="tmdb"
      :src="`${image}`"
      :alt="title + ' poster'"
      :placeholder="[180, 180, 60, 5]"
    />
    <p class="suggestion-title">{{ truncTitle }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  tmdbId: string;
  title: string;
  image: string;
}>();
// TODO fetch TMDB data
const title = props.title;
const image = props.image;

const truncTitle = title.length > 40 ? title.slice(0, 40) + "..." : title;

await new Promise((resolve) =>
  setTimeout(resolve, Math.floor(Math.random() * 4000 + 1000))
);
</script>

<style scoped lang="scss">
@import "~/assets/scss/variables.scss";

.suggestion-item {
  padding: 15px 10px 0px 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: $bgColorHover;
  }
}

.suggestion-image {
  width: 180px;
  aspect-ratio: 1/1;
  object-fit: cover;
}

.suggestion-title {
  max-width: 180px;
  max-height: 180px;
  text-align: center;
  margin: 15px 0;
}
</style>
