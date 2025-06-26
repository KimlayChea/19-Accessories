import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Heart, User, LogIn, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { getCartItems } from "@/utils/cartUtils";

import { useAuthUser } from "../customs/hooks/authentication/useAuthUser";
import { useCategories } from "../customs/hooks/category/useCategories";
import SpinnerMini from "@/components/ui/SpinnerMini";
import { Avatar, AvatarFallback } from "./ui/avatar";

const Header = () => {
  const { user, isAuthenticated } = useAuthUser();
  const { isPending, categories } = useCategories();

  const [cartCount, setCartCount] = useState(() => getCartItems().length);

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleStorage = () => setCartCount(getCartItems().length);

    window.addEventListener("storage", handleStorage);
    // If you update cart in the same tab, call handleStorage manually after add/remove
    // Or use a custom event:
    window.addEventListener("cart-updated", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("cart-updated", handleStorage);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-xl bg-background/80">
      <div className="container mx-auto py-3 px-4 lg:px-6">
        <div className="flex items-center justify-between ">
          {/* Logo */}
          <Link
            to="/"
            className="text-lg sm:text-xl md:text-2xl font-bold flex items-center gap-2 shrink-0"
          >
            <img
              src="/logo.JPG"
              className="h-8 w-8 sm:h-10 sm:w-10 object-cover rounded-full"
              alt="logo"
            />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              <span className="hidden xs:inline">19 Accessories</span>
              <span className="xs:hidden">19 Accessories</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link
              to="/"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Home
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50 text-sm">
                    Categories
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    {isPending ? (
                      <ul className="flex w-[400px] flex-col gap-4 justify-center items-center h-[312px] p-4 md:w-[350px] lg:w-[450px]">
                        <SpinnerMini />
                        <span>Loading...</span>
                      </ul>
                    ) : (
                      <ul className="grid w-[400px] gap-3 p-4 md:min-w-[450px] md:grid-cols-2 lg:min-w-[450px]">
                        {categories.map((category) => (
                          <li key={category.id} className="row-span-1">
                            <NavigationMenuLink asChild>
                              <Link
                                to={`/products?category=${category.category.toLowerCase()}`}
                                className="flex h-full w-full select-none justify-start items-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-2 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground outline-none gap-2"
                              >
                                <div className="text-lg font-medium">
                                  {category.category}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  ({category.itemCount} items)
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              to="/products"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Products
            </Link>

            <Link
              to="/about"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            <Link
              to="/favorites"
              className="text-foreground hover:text-primary transition-colors p-1"
            >
              <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only">Favorites</span>
            </Link>

            <Link
              to="/cart"
              className="text-foreground hover:text-primary transition-colors p-1 relative"
            >
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only">Cart</span>
              {isAuthenticated && (
                <span
                  className="absolute -top-2 -right-2 flex items-center justify-center rounded-2xl bg-red-500 text-white text-xs font-bold shadow px-1"
                  style={{ pointerEvents: "none" }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <Link
                to="/profile"
                className="text-foreground hover:text-primary transition-colors p-1"
              >
                {user.user_metadata.avatar ? (
                  <img
                    className="w-8 h-8 rounded-full object-cover p-[1px] border border-ring"
                    src={user.user_metadata.avatar}
                    alt={user.user_metadata.fullName}
                  />
                ) : (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-base bg-muted">
                      {user.user_metadata.fullName ? (
                        user.user_metadata.fullName?.[0].toUpperCase()
                      ) : (
                        <User />
                      )}
                    </AvatarFallback>
                  </Avatar>
                )}
                <span className="sr-only">Profile</span>
              </Link>
            ) : (
              <Link
                to={isLoginPage ? "/signup" : "/login"}
                className="hidden sm:block"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 text-xs sm:text-sm"
                >
                  <LogIn className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden md:inline">
                    {isLoginPage ? "Sign In" : "Login"}
                  </span>
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-1">
              <Link
                to="/"
                className="px-3 py-2 rounded-md hover:bg-accent transition-colors text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              <div className="px-3 py-2 font-medium text-sm text-muted-foreground">
                Categories
              </div>
              <div className="pl-3 space-y-1">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/products?category=${category.category.toLowerCase()}`}
                    className="px-3 py-2 rounded-md hover:bg-accent block transition-colors text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.category} ({category.itemCount})
                  </Link>
                ))}
              </div>

              <Link
                to="/products"
                className="px-3 py-2 rounded-md hover:bg-accent transition-colors text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>

              <Link
                to="/about"
                className="px-3 py-2 rounded-md hover:bg-accent transition-colors text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className="px-3 py-2 rounded-md hover:bg-accent transition-colors text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>

              <Link
                to="/favorites"
                className="px-3 py-2 rounded-md hover:bg-accent transition-colors text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Favorites
              </Link>

              {/* Mobile Theme Toggle */}
              <div className="px-3 py-2 flex items-center justify-between">
                <span className="text-sm font-medium">Theme</span>
                <ThemeToggle />
              </div>

              {!isAuthenticated ? (
                <div className="flex flex-col gap-2 px-3 pt-2">
                  <Link
                    to="/login"
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start text-sm"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </Link>

                  <Link
                    to="/signup"
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="w-full justify-start text-sm">
                      <User className="h-4 w-4 mr-2" />
                      Sign Up
                    </Button>
                  </Link>
                </div>
              ) : (
                <Link
                  to="/profile"
                  className="px-3 py-2 rounded-md hover:bg-accent transition-colors text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Profile
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
