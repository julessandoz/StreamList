import { tmdbMovieDetail } from "~/types/tmdb/tmdbMovieDetail";

export default defineEventHandler(async (event) => {
  const endpoint = "/movie";
  const query = getQuery(event);
  const config = useRuntimeConfig();
  try {
    const response: tmdbMovieDetail = await $fetch(
      `${config.TMDB_API}${endpoint}/${query.id}`,
      { headers: { Authorization: `Bearer ${config.TMDB_KEY}` } }
    );
    return response;
  } catch (error) {
    return { error: "No results found", code: 404 };
  }
})