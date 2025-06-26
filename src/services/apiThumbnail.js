import supabase from "./supabase";

export async function getThumbnail() {
  const {
    data: { thumbnail },
    error,
  } = await supabase.from("thumbnail").select("thumbnail").single();

  if (error) throw new Error(error.message);

  return thumbnail;
}
