<template>
  <div class="v-spinner" v-show="loading">
    <div class="v-sync v-sync1" v-bind:style="[spinnerStyle, spinnerDelay1]"></div>
    <div class="v-sync v-sync2" v-bind:style="[spinnerStyle, spinnerDelay2]"></div>
    <div class="v-sync v-sync3" v-bind:style="[spinnerStyle, spinnerDelay3]"></div>
  </div>
</template>
<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: true,
  },
  color: {
    type: String,
    default: "#ffffff",
  },
  size: {
    type: String,
    default: "15px",
  },
  margin: {
    type: String,
    default: "2px",
  },
  radius: {
    type: String,
    default: "100%",
  },
});

const spinnerStyle = computed(() => {
  return {
    backgroundColor: props.color,
    height: props.size,
    width: props.size,
    margin: props.margin,
    borderRadius: props.radius,
    display: "inline-block",
    animationName: "stretch",
    animationDuration: "0.6s",
    animationIterationCount: "infinite",
    animationTimingFunction: "ease-in-out",
    animationFillMode: "both",
  };
});

const spinnerDelay1 = computed(() => {
  return {
    animationDelay: "0.07s",
  };
});

const spinnerDelay2 = computed(() => {
  return {
    animationDelay: "0.14s",
  };
});

const spinnerDelay3 = computed(() => {
  return {
    animationDelay: "0.21s",
  };
});
</script>
<script>
export default {
  name: "SyncLoader",
};
</script>

<style>
@-webkit-keyframes stretch {
  33% {
    -webkit-transform: translateY(3px);
    transform: translateY(3px);
  }
  66% {
    -webkit-transform: translateY(-3px);
    transform: translateY(-3px);
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

@keyframes stretch {
  33% {
    -webkit-transform: translateY(3px);
    transform: translateY(3px);
  }
  66% {
    -webkit-transform: translateY(-3px);
    transform: translateY(-3px);
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}
</style>
