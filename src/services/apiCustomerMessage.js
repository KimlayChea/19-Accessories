import supabase from "./supabase";

export async function customerSendMessage(customer) {
  const { data, error } = await supabase
    .from("customerMessages")
    .insert([{ ...customer, status: "unread" }]);

  if (error) throw new Error(error.message);
  return data;
}
