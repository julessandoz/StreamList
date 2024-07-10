import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const supabaseClient = await serverSupabaseClient(event);

  if (!query.search) {
    return { error: "Missing search query", code: 403 };
  }

  const searchQuery = query.search

  if (!supabaseClient) {
    return { error: "Supabase client not initiated", code: 403 };
  }

  const userProfiles = await supabaseClient.from('Users').select().ilike("username", `%${searchQuery}%`)
  return userProfiles.data
});
