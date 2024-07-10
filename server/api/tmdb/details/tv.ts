export default defineEventHandler(async (event) => {
  const endpoint = "/tv";
  const query = getQuery(event);
  const config = useRuntimeConfig();
  try {
    const response: any = await $fetch(
      `${config.TMDB_API}${endpoint}/${query.id}`,
      { headers: { Authorization: `Bearer ${config.TMDB_KEY}` } }
    );
    return response.results;
  } catch (error) {
    return { error: "No results found", code: 404 };
  }
});