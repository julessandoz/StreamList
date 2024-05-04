<template>
  <div :id="tmdbId" class="list-item" @click="(e) => itemClick(e)">
    <div class="list-item-image">
      <NuxtImg
        provider="tmdb"
        :src="image"
        :alt="`${title} poster`"
        :class="type === 'User' ? 'rounded' : 'square'"
      />
    </div>
    <p class="list-item-title">{{ title }}</p>
    <p class="list-item-type">{{ type }}</p>
    <p class="list-item-year">{{ year }}</p>
    <div class="list-item-icon-wrapper">
      <IconCSS :name="props.icon" size="24px" class="list-item-icon" v-if="props.icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  tmdbId: string;
  title: string;
  image: string;
  type: "User" | "Movie" | "TV Show" | "Watchlist";
  year: string | null;
  icon: string | null;
}>();

// TODO: Replace with TMDB fetch and add logic for users and watchlists
const tmdbId = props.tmdbId;
const title = props.title;
const image = props.image;
const type = props.type;
const year = props.year;

const emit = defineEmits(["itemClicked", "iconClicked"]);

function itemClick(e: MouseEvent) {
  if (e.target instanceof HTMLElement) {
    const target = e.target as HTMLElement;
    if (
      target.classList.contains("list-item-icon") ||
      target.classList.contains("list-item-icon-wrapper")
    ) {
      // TODO: Add logic for icon click
      emit("iconClicked", tmdbId);
      return;
    } else {
      emit("itemClicked", tmdbId);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables.scss";

.list-item {
  font-family: $bodyFont;
  margin: 0 50px;
  padding: 0 15px 0 0;
  width: 100%;
  max-width: calc(100% - 100px);
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
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.list-item-type,
.list-item-year {
  font-size: $smallTextSize;
  font-weight: $bodyLight;
  justify-self: center;
}
.list-item-icon-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  justify-self: end;
}

@media (max-width: 768px) {
  .list-item {
    grid-template-columns: 50px repeat(2, 0.25fr) repeat(2, 1fr) 24px;
    grid-template-rows: 1fr 0.5fr;
    height: 50px;
    gap: 0 1em;
  }

  .list-item-image {
    grid-column-start: 1;
    grid-column-end: 1;
    grid-row-start: 1;
    grid-row-end: 3;
  }

  .list-item-title {
    grid-column-start: 2;
    grid-column-end: 6;
    grid-row-start: 1;
    grid-row-end: 1;
    align-self: bottom;
    max-height: 25px;
    margin: 0;
  }

  .list-item-type {
    grid-column-start: 2;
    grid-column-end: 3;
  }

  .list-item-year {
    grid-column-start: 3;
    grid-column-end: 4;
  }

  .list-item-type,
  .list-item-year {
    grid-row-start: 2;
    grid-row-end: 2;
    justify-self: baseline;
    align-self: center;
    max-height: 15px;
    margin: 0;
  }

  .list-item-icon-wrapper {
    grid-column-start: 6;
    grid-column-end: 6;
    grid-row-start: 1;
    grid-row-end: 3;
    align-self: start;
    max-height: 50px;
  }
}
</style>
