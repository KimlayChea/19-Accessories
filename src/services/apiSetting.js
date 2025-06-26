import supabase from "./supabase";

export async function getSetting() {
  const { data: data, error } = await supabase
    .from("setting")
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return data;
}
