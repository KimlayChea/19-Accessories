import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
        expressDelivery: "Standard (for those who live in Phnom Penh)",
        address: "",
        phoneNumber: "",
        role: "authenticated",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  const { user } = data;
  // Check the role inside user_metadata
  const role = user?.user_metadata?.role;

  if (role !== "authenticated") {
    // Immediately sign out and optionally show a message
    await supabase.auth.signOut();
    throw new Error("User is not authorized, please create new account!");
  }

  return data;
}

export async function getCurrentUser() {
  //  use get session, so this will actually get that data from local storage
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  // can get the user from the session, but it is a bite secure to just redownload every-
  // from the supabase
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(Error.message);
}

export async function updateUser({
  password,
  fullName,
  address,
  phoneNumber,
  expressDelivery,
}) {
  // 1. updata the password or fullName
  let updateData;

  // These two can be true one at the same time, that why we wrote like this
  if (password) updateData = { password };

  if (fullName && address && phoneNumber && expressDelivery)
    updateData = {
      data: {
        fullName,
        address,
        phoneNumber,
        expressDelivery,
      },
    };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  return data;
}

export async function updateUserAvatar(avatar) {
  // Get current user info
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw new Error(userError.message);

  // 1. Delete the old avatar (if exists and not default)
  const oldAvatarUrl = user.user_metadata?.avatar;

  if (oldAvatarUrl) {
    // Extract path after '/avatars/'
    const pathParts = oldAvatarUrl.split("/avatars//");
    const filePath = pathParts[1]; // e.g. 'avatar-0.123456'

    if (filePath) {
      await supabase.storage.from("avatars").remove([filePath]);
    }
  }

  // 1. Upload the avatar image
  const fileName = `avatar-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 2. if upload avatar is successed then Update avatar in the user
  const { data: updatedUser, error: errorUpdate } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars//${fileName}`,
      },

      // https://ufcgeaktlgizeqopoufv.supabase.co/storage/v1/object/public/avatars//girl-watching-shooting-stars-wallpaper-5120x2160_16.jpg
    });

  if (errorUpdate) throw new Error(errorUpdate.message);

  return updatedUser;
}

export async function verifyCurrentPassword({ email, currentPassword }) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: currentPassword,
  });
  if (error) throw new Error("Current password is incorrect");
}
