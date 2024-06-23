<template>
  <nav :class="isMenuCollapsed ? 'collapsed' : ''">
    <div class="nav-items">
      <NuxtLink to="/home">
        <BaseNavItem iconName="ic:round-house" label="Home" class="active" />
      </NuxtLink>
      <NuxtLink to="/search">
        <BaseNavItem iconName="ic:round-search" label="Search" />
      </NuxtLink>
      <NuxtLink to="/watchlists">
        <BaseNavItem iconName="ic:round-movie" label="Watchlists" />
      </NuxtLink>
      <NuxtLink to="/profile">
        <BaseNavItem iconName="ic:round-person" label="Profile" />
      </NuxtLink>
    </div>
    <BaseNavItem
      class="collapse-btn"
      :iconName="
        isMenuCollapsed
          ? 'tabler:layout-sidebar-left-expand'
          : 'tabler:layout-sidebar-left-collapse'
      "
      :label="isMenuCollapsed ? 'Open' : 'Collapse'"
      @itemClicked="toggleCollapse"
    />
  </nav>
</template>

<script setup lang="ts">
const isMenuCollapsed = ref(true);

const toggleCollapse = () => {
  isMenuCollapsed.value = !isMenuCollapsed.value;
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables.scss";
nav {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $bgNav;
  max-width: 200px;
  height: 100%;

  .nav-items {
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
  }
}
@media (max-width: 768px) {
  nav {
    top: initial;
    bottom: 0;
    gap: 0;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    max-height: 100px;
    max-width: 100%;
    width: 100vw;

    .nav-items {
      padding: 0;
      flex-direction: row;
    }

    .collapse-btn {
      display: none;
    }
  }
}
</style>
