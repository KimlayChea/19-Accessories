import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import {
  getCartItems,
  saveCartItems,
  removeItemFromCart,
} from "@/utils/cartUtils";
import { useProductCarts } from "../customs/hooks/product/useProductCarts";
import SpinnerMini from "../components/ui/SpinnerMini";
import { useSetting } from "../customs/hooks/setting/useSetting";
import { useAuthUser } from "@/customs/hooks/authentication/useAuthUser";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

const Cart = () => {
  const { user } = useAuthUser();
  const loadedCartItems = getCartItems();
  const productCartIds = loadedCartItems.map((cartItem) =>
    Number(cartItem.productId)
  );
  const { products, isPending } = useProductCarts(productCartIds);

  const { setting, isPendingSetting } = useSetting();

  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);

  const [cartItems, setCartItems] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [deletingRow, setDeletingRow] = useState<string | null>(null);

  // Modal state for delivery and address
  const [deliveryMethod, setDeliveryMethod] = useState(
    user?.user_metadata?.expressDelivery ||
      "Standard (for those who live in Phnom Penh)"
  );
  const [address, setAddress] = useState(user?.user_metadata?.address || "");

  const [phoneNumber, setPhoneNumber] = useState(
    user?.user_metadata?.phoneNumber || ""
  );

  // Load cart products
  useEffect(() => {
    if (isPending) return;
    const loadedCartItems = getCartItems();
    setCartItems(loadedCartItems);
    const loadedProducts = loadedCartItems.map((item) => {
      const product = products.find((p) => p.id === Number(item.productId));
      return {
        ...item,
        productId: Number(item.productId),
        product,
      };
    });
    setCartProducts(loadedProducts);
  }, [isPending, products]);

  // Calculate subtotal, shipping, and total when cart or setting changes
  useEffect(() => {
    if (isPendingSetting) return;
    const shippingFee = setting?.shippingFee ?? 0;
    const freeShippingThreshold = setting?.freeShippingThreshold ?? 0;

    const newSubtotal = cartProducts.reduce((sum, item) => {
      if (!item.product) return sum; // skip if product is missing
      const price = item.product.discount
        ? item.product.price * (1 - item.product.discount / 100)
        : item.product.price;
      return sum + price * item.quantity;
    }, 0);

    const newShipping = newSubtotal >= freeShippingThreshold ? 0 : shippingFee;
    setSubtotal(newSubtotal);
    setShipping(newShipping);
    setTotal(newSubtotal + newShipping);
  }, [cartProducts, setting, isPendingSetting]);

  // Update item quantity
  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 10) return;
    const updatedItems = cartItems.map((item) =>
      Number(item.productId) === productId && item.size === size
        ? {
            ...item,
            productId: Number(item.productId),
            quantity: newQuantity,
          }
        : item
    );
    setCartItems(updatedItems);
    saveCartItems(updatedItems);

    // Update cart products display
    const updatedProducts = updatedItems.map((item) => {
      const product = products.find((p) => p.id === Number(item.productId));
      return {
        ...item,
        productId: Number(item.productId),
        product,
      };
    });

    setCartProducts(updatedProducts);
  };

  // Remove item from cart with "Deleting..." row
  const removeItem = (productId, size) => {
    setDeletingRow(`${productId}-${size}`);
    const updatedItems = removeItemFromCart(productId, size);
    window.dispatchEvent(new Event("cart-updated"));
    setCartItems(updatedItems);

    // Update cart products display
    const updatedProducts = updatedItems.map((item) => {
      const product = products.find((p) => p.id === Number(item.productId));
      return {
        ...item,
        product,
      };
    });
    setCartProducts(updatedProducts);
    setDeletingRow(null);
  };

  if (isPending) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[300px] bg-background text-foreground">
        <SpinnerMini />
        <h1 className="text-2xl font-bold mt-4">Loading shopping cart...</h1>
      </div>
    );
  }

  if (!isPending && (cartItems.length === 0 || cartProducts.length === 0))
    return (
      <div className="container mx-auto px-4 py-16 text-center bg-background text-foreground">
        <div className="max-w-md mx-auto">
          <ShoppingBag
            size={64}
            className="mx-auto text-muted-foreground mb-6"
          />
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart items */}
        <div className="lg:w-2/3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Product</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartProducts.map((item, index) => {
                const { product, quantity, size } = item;
                const rowKey = `${product.id}-${size}-${index}`;
                const itemPrice = product.discount
                  ? product.price * (1 - product.discount / 100)
                  : product.price;

                if (deletingRow === `${product.id}-${size}`) {
                  return (
                    <TableRow key={rowKey}>
                      <TableCell
                        colSpan={5}
                        className="text-center text-muted-foreground"
                      >
                        Deleting...
                      </TableCell>
                    </TableRow>
                  );
                }

                return (
                  <TableRow key={rowKey}>
                    <TableCell>
                      <Link to={`/products/${product.id}`}>
                        <div className="aspect-square w-20 h-20 rounded overflow-hidden bg-muted">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`/products/${product.id}`}
                        className="font-medium hover:underline"
                      >
                        {product.title}
                      </Link>
                      <div className="text-sm text-muted-foreground mt-1">
                        Size: {size}
                      </div>
                    </TableCell>
                    <TableCell>
                      {product.discount ? (
                        <div>
                          <div className="font-medium">
                            ${itemPrice.toFixed(2)}
                          </div>
                          <div className="text-sm text-muted-foreground line-through">
                            ${product.price.toFixed(2)}
                          </div>
                        </div>
                      ) : (
                        <div className="font-medium">
                          ${itemPrice.toFixed(2)}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <button
                          className="w-8 h-8 rounded-l border border-border bg-background hover:bg-muted flex items-center justify-center"
                          onClick={() =>
                            updateQuantity(product.id, size, quantity - 1)
                          }
                          disabled={quantity <= 1 || !!deletingRow}
                        >
                          <Minus size={14} />
                        </button>
                        <div className="w-10 h-8 border-t border-b border-border bg-background flex items-center justify-center">
                          {quantity}
                        </div>
                        <button
                          className="w-8 h-8 rounded-r border border-border bg-background hover:bg-muted flex items-center justify-center"
                          onClick={() =>
                            updateQuantity(product.id, size, quantity + 1)
                          }
                          disabled={quantity >= 10 || !!deletingRow}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-medium">
                        ${(itemPrice * quantity).toFixed(2)}
                      </div>
                      <button
                        className="text-destructive hover:text-destructive/80 mt-2"
                        onClick={() => removeItem(product.id, size)}
                        disabled={!!deletingRow}
                      >
                        <Trash size={16} />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:w-1/3">
          <div className="rounded-lg p-6 bg-card border">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">${shipping.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-full mb-4">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Confirm Delivery & Address
                  </AlertDialogTitle>
                  {/* <AlertDialogDescription>
                    <div className="space-y-4 mt-2">
                      <div>
                        <label className="block font-medium mb-1">
                          Express Delivery
                        </label>
                        <select
                          className="w-full border rounded px-3 py-2"
                          value={deliveryMethod}
                          onChange={(e) => setDeliveryMethod(e.target.value)}
                        >
                          <option value="standard">
                            Standard (for those who live in Phnom Penh)
                          </option>
                          <option value="virakbuntham">Virak Buntham</option>
                          <option value="jtexpress">J&T Express</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-medium mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          className="w-full border rounded px-3 py-2"
                          placeholder="Enter your address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                  </AlertDialogDescription> */}
                  <AlertDialogDescription>
                    Please confirm your express delivery method and shipping
                    address before proceeding to checkout.
                  </AlertDialogDescription>
                  <div className="space-y-4 mt-2">
                    <div>
                      <label className="block font-medium mb-1">
                        Express Delivery
                      </label>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        value={deliveryMethod}
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                      >
                        <option value="Standard (for those who live in Phnom Penh)">
                          Standard (for those who live in Phnom Penh)
                        </option>
                        <option value="Virak Buntham">Virak Buntham</option>
                        <option value="J&T Express">J&T Express</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium mb-1">Address</label>
                      <Input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Enter your address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block font-medium mb-1">
                        Phone Number
                      </label>
                      <Input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Enter your phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                  </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      // handle confirm logic here
                      // e.g., save deliveryMethod and address, then proceed to checkout
                    }}
                  >
                    Confirm & Checkout
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <div className="text-xs text-muted-foreground text-center">
              <p>Secure checkout powered by Stripe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
