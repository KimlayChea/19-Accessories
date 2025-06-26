// Cart utility functions for managing localStorage cart operations

export const getCartItems = () => {
  try {
    const cartItems = localStorage.getItem("cartItems");
    return cartItems ? JSON.parse(cartItems) : [];
  } catch (error) {
    console.error("Error reading cart from localStorage:", error);
    return [];
  }
};

export const saveCartItems = (items) => {
  try {
    localStorage.setItem("cartItems", JSON.stringify(items));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

export const isItemInCart = (productId, size) => {
  const cartItems = getCartItems();
  return cartItems.some(
    (item) => Number(item.productId) === productId && item.size === size
  );
};

export const addItemToCart = (productId, quantity, size) => {
  const cartItems = getCartItems();
  const existingItemIndex = cartItems.findIndex(
    (item) => Number(item.productId) === productId && item.size === size
  );

  if (existingItemIndex > -1) {
    // Update quantity if item already exists
    cartItems[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    cartItems.push({ productId, quantity, size });
  }

  saveCartItems(cartItems);
  return cartItems;
};

export const removeItemFromCart = (productId, size) => {
  const cartItems = getCartItems();
  const updatedItems = cartItems.filter(
    (item) => !(Number(item.productId) === productId && item.size === size)
  );

  saveCartItems(updatedItems);
  return updatedItems;
};
