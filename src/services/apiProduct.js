import supabase from "./supabase";

export async function getProducts({ LIMIT_ROW, filters, searchQuery }) {
  let query = supabase
    .from("products")
    .select("*, products_categories(*, categories(*))");

  if (LIMIT_ROW) query = query.limit(LIMIT_ROW);

  if (searchQuery)
    query = query.or(
      `title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`
    );

  if (filters?.minPrice > 0 && filters?.maxPrice > 0)
    query = query.gte("price", filters.minPrice).lte("price", filters.maxPrice);

  if (filters?.minPrice > 0) query = query.gte("price", filters.minPrice);

  if (filters?.maxPrice > 0) query = query.lte("price", filters.maxPrice);

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  let filteredData = data;
  if (filters?.categories.length > 0) {
    filteredData = data.filter((product) =>
      product.products_categories.some((pc) =>
        filters.categories.includes(pc.categories.category.toLowerCase())
      )
    );
  }

  return filteredData;
}

export async function getInStock(id) {
  const { data, error } = await supabase
    .from("products_stock")
    .select("itemCount") // or the actual stock field name
    .eq("product_id", id);

  if (error) throw new Error(error.message);

  const inStock = data.reduce((acc, cur) => acc + cur.itemCount, 0) > 0;

  return inStock; // returns true/false or the stock count
}

export async function getProduct(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*, products_stock(*, sizes(*))")
    .eq("id", id);

  if (error) throw new Error(error.message);

  return data[0];
}

export async function getProductCarts(productCartIds) {
  const { data, error } = await supabase
    .from("products")
    .select("*, products_stock(*, sizes(*))")
    .in("id", productCartIds);

  if (error) throw new Error(error.message);

  return data;
}

export async function getProductsRelated(currentProductId) {
  // Fetch the current product with its categories
  const { data: products, error: errorProducts } = await supabase
    .from("products")
    .select("*, products_categories(*, categories(*))")
    .eq("id", currentProductId);

  if (errorProducts) throw new Error(errorProducts.message);

  // Defensive: check if product exists
  if (!products || products.length === 0) return [];

  // Get category names from the current product
  const categories = products[0].products_categories.map((pc) =>
    pc.categories.category.toLowerCase()
  );

  if (categories.length === 0) return [];

  // Fetch other products with their categories
  const { data, error } = await supabase
    .from("products")
    .select("*, products_categories(*, categories(*))")
    .neq("id", currentProductId)
    .limit(100); // Fetch more for better filtering

  if (error) throw new Error(error.message);

  // Filter on the client: keep products that share at least one category
  const related = data
    .filter((product) =>
      product.products_categories.some((pc) =>
        categories.includes(pc.categories.category.toLowerCase())
      )
    )
    .slice(0, 12); // Limit to 12 results

  return related;
}
