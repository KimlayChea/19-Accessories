import supabase from "./supabase";

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*, products_categories(*)");

  if (error) throw new Error(error.message);

  const categories = data?.map((category) => {
    return {
      id: category.id,
      category: category.category,
      image: category.image,
      itemCount: category.products_categories.length,
    };
  });

  return categories;
}
