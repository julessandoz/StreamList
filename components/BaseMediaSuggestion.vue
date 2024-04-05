<template>
  <div class="suggestion-item" @click="$emit('sugggestionClicked', props.tmdbId)">
    <NuxtImg
      :id="`suggestion-${props.tmdbId}`"
      class="suggestion-image"
      provider="tmdb"
      :src="`${image}`"
      :alt="title + ' poster'"
    />
    <p class="suggestion-title">{{ title }}</p>
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

// const truncTitle = title.length > 35 ? title.slice(0, 35) + "..." : title;
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
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
  max-height: 180px;
  text-align: center;
  margin: 15px 0;
}

@media (max-width: 768px) {
  .suggestion-item {
    min-width: 100px;
  }

  .suggestion-image {
    width: 90px;
  }
  .suggestion-title {
    max-width: 100px;
  }
}
</style>
