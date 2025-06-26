import supabase from "./supabase";
import { getCurrentUser } from "./apiAuth";

export async function getFavorites() {
  const user = await getCurrentUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("favorites")
    .select("*, products(*)")
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);

  const favorites = data.map((favorite) => favorite.products);

  return favorites;
}

export async function addFavorite(productId) {
  const user = await getCurrentUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("favorites")
    .insert([{ product_id: productId, user_id: user.id }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteFavorite(productId) {
  const user = await getCurrentUser();

  if (!user) return null;

  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("product_id", productId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);

  return true;
}
