import { serverSupabaseClient } from "#supabase/server";
import { tmdbSearchResult } from "~/types/tmdb/tmdbSearchResult";
import { distance } from "fastest-levenshtein";

export default defineEventHandler(async (event) => {
  const endpoint = "search/multi";
  const defaultFlags = "&include_adult=false&language=en-US";
  const query = getQuery(event);
  const config = useRuntimeConfig();
  const supabaseClient = await serverSupabaseClient(event);

  if (!query.search) {
    return { error: "Missing search query", code: 403 };
  }

  const searchQuery = query.search as string;

  if (!supabaseClient) {
    return { error: "Supabase client not initiated", code: 403 };
  }
  try {
    const userProfiles = await supabaseClient
      .from("Users")
      .select()
      .ilike("username", `%${searchQuery}%`);
    const watchlists = await supabaseClient
      .from("Watchlists")
      .select()
      .ilike("name", `%${searchQuery}%`);

    const tmdbData: any = await $fetch(
      `${config.TMDB_API}${endpoint}?query=${searchQuery}${defaultFlags}`,
      { headers: { Authorization: `Bearer ${config.TMDB_KEY}` } }
    );

    const sanitizedTMDB = tmdbData.results.reduce(
      (res: any[], result: tmdbSearchResult) => {
        if (result.media_type === "tv" || result.media_type === "movie") {
          res.push({
            id: result.id,
            name: result.title || result.name,
            type: result.media_type,
            release:
              new Date(result.release_date as string).getFullYear() ||
              new Date(result.first_air_date as string).getFullYear(),
            poster: result.poster_path || result.backdrop_path,
          });
        }
        return res;
      },
      []
    );
    const fullResults = sanitizedTMDB.concat(
      userProfiles.data,
      watchlists.data
    );

    const sortedResults = fullResults.sort((a: any, b: any) => {
      const fieldA = a.name || a.username;
      const fieldB = b.name || b.username;
      const distanceA = distance(searchQuery, fieldA);
      const distanceB = distance(searchQuery, fieldB);
      return distanceA - distanceB;
    });

    return sortedResults;
  } catch (error) {
    return { error: "Error fetching data", code: 400 };
  }
});
