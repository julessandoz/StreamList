<template>
  <footer>
    <p class="copyright">&copy; {{ currentYear }} - Jules Sandoz</p>
    <div class="tmdb-attribution">
      <p>
        This product uses the
        <a href="https://www.themoviedb.org/" target="_blank">TMDB API</a> but is not
        endorsed or certified by TMDB.
      </p>
      <a href="https://www.themoviedb.org" target="_blank">
        <NuxtImg
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
          alt="The Movie Database logo"
          height="20px"
        />
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables.scss";

footer {
  width: 100%;
  max-width: calc(100% - 200px);
  display: flex;
  flex-basis: 180px;
  justify-content: space-between;
  gap: 50px;
  padding: 20px 100px;
  background-color: $bgColor;
  color: $fontColor;
  font-size: 12px;
}

.copyright {
  flex-shrink: 0;
}

.tmdb-attribution {
  flex-shrink: 2;
  display: flex;
  gap: 20px;
  align-items: center;

  a {
    color: $fontColor;
    text-decoration: underline;

    &:visited {
      color: $fontColorHover;
    }
  }
}

@media (max-width: 768px) {
  footer {
    height: 100px;
    justify-content: space-around;
    gap: 0px;
    max-width: calc(100% - 40px);
    flex-direction: column;
    padding: 20px 20px;
  }
}
</style>
