import { tmdbTvSearchResult } from "~/types/tmdb/tmdbTvSearchResult";

export default defineEventHandler(async (event) => {
  const endpoint = "search/tv";
  const defaultFlags = "&include_adult=false&language=en-US";
  const query = getQuery(event);
  const config = useRuntimeConfig();

  if (!query.search) {
    return { error: "Missing search query", code: 403 };
  }

  const searchQuery = query.search as string;

  try {
    const tmdbData: any = await $fetch(
      `${config.TMDB_API}${endpoint}?query=${searchQuery}${defaultFlags}`,
      { headers: { Authorization: `Bearer ${config.TMDB_KEY}` } }
    );

    const sanitizedTMDB = tmdbData.results.reduce(
      (res: any[], result: tmdbTvSearchResult) => {
        res.push({
          id: result.id,
          name: result.name,
          release: new Date(result.first_air_date as string).getFullYear(),
          poster: result.poster_path || result.backdrop_path,
        });

        return res;
      },
      []
    );

    return sanitizedTMDB;
  } catch (error) {
    return { error: "Error fetching data", code: 400 };
  }
});
