import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import useScrollToTop from "@/hooks/useScrollToTop";

const Layout = () => {
  useScrollToTop();

  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex-grow min-h-[95vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
