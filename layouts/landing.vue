<template>
  <div>
    <BaseButton
      class="sign-in-btn"
      text="Sign In"
      size="sm"
      btnStyle="filled"
      type="button"
      color="accent"
      @btnClicked="navigateTo('/login')"
    />
  </div>
  <div class="banner">
    <p class="message">{{ currentMessage }}</p>
  </div>
  <div class="content-wrapper">
    <slot />
  </div>
  <TheFooter />
</template>

<script setup lang="ts">
const messages = [
  "What are we watching tonight?",
  "Wait you haven't seen that?!",
  "I just never know what to watch...",
  "You guys need to watch that show!",
  "What was that movie you told me to watch?",
  "I feel like the scrolling is longer than the movie...",
  "I'm just going to watch The Office again",
];

// const currentMessage changes through the messages, changing every 1.5 seconds
const currentMessage = ref(messages[0]);
let currentIndex = 0;
onMounted(() => {
  const interval = setInterval(() => {
    currentIndex = (currentIndex + 1) % messages.length;
    currentMessage.value = messages[currentIndex];
  }, 2500);
  onBeforeUnmount(() => {
    clearInterval(interval);
  });
});
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables.scss";
.sign-in-btn {
  position: fixed;
  top: 30px;
  right: 30px;
  z-index: 10;
}

.banner {
  margin-bottom: 50px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, $bgColor 98%),
    url("~/public/landing-banner.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 60dvh;
  max-height: 500px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.message {
  width: max(25%, 300px);
  max-width: 400px;
  font-size: $h3Size;
  text-align: center;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-wrapper {
  margin-inline: 5%;
}

footer {
  margin-top: 50px;
}
</style>
