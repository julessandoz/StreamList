<template>
  <section class="section-1">
    <div class="text-wrapper">
      <h2 class="section-title">Less scrolling, more watching</h2>
      <p>
        Forget 'What do we watch?' and dive straight into 'This is the one!' With
        StreamList, end the endless scroll and seamlessly track, share, and discover
        must-watch movies and TV shows.
      </p>
    </div>
    <div class="img-wrapper">
      <NuxtImg src="/watching-tv.png" alt="family watching TV" />
    </div>
  </section>
  <section class="section-2">
    <div class="img-wrapper">
      <NuxtImg src="/demo-mockup.png" alt="preview of Streamlist on laptop and mobile" />
    </div>
    <div class="text-wrapper">
      <h2 class="section-title">Why StreamList?</h2>
      <p>
        Create your own or collaborate with friends to build the ultimate collection of
        movies and series. Get the lowdown on your next watch with detailed insights.
      </p>
      <p>
        Wondering where to stream? We've got you covered. Find out where your chosen
        titles are available across streaming services worldwide.
      </p>
      <p>
        As you journey through your cinematic adventures, easily mark off what you've
        seen, ensuring your watchlist is always fresh and up to date.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "landing",
});
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables.scss";

section {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10%;
  &:not(:last-child) {
    margin-bottom: 50px;
  }
}

.img-wrapper {
  img {
    max-height: 450px;
    transform: scaleX(-1);
  }
}

.section-title {
  font-size: $h1Size;
}
</style>
