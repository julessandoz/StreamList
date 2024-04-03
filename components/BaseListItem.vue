<template>
  <div :id="tmdbId" class="list-item" @click="(e) => itemClick(e)">
    <div class="list-item-image">
      <NuxtImg
        provider="tmdb"
        :src="image"
        :alt="`${title} poster`"
        :placeholder="[50, 50, 20, 5]"
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
.list-item-icon-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  justify-self: end;
}
</style>
