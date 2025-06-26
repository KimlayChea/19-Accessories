import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useThumbnail } from "../customs/hooks/thumbnail/useThumbnail";

const HeroSection = () => {
  const { isDarkMode } = useUser();
  const navigate = useNavigate();
  const { thumbnail, isPending } = useThumbnail();

  const handleShopNow = () => {
    navigate("/products");
  };

  const handleExploreCollection = () => {
    navigate("/products");
  };

  return (
    <div
      className={`relative flex items-center ${
        isDarkMode ? "bg-gray-900" : "bg-gray-800"
      } text-white`}
      style={{ height: "510px" }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${isPending ? "" : thumbnail})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isDarkMode ? 0.4 : 0.5,
        }}
      />

      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Welcome to 19 Accessories
          </h1>
          <p className="text-xl mb-8">
            Discover the latest trends and timeless fashion pieces that define
            your unique style.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="" onClick={handleShopNow}>
              Shop Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-slate-50 bg-[#000a0e]/[0.48]"
              onClick={handleExploreCollection}
            >
              Explore Collection
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
