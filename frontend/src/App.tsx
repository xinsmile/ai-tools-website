import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Category from "@/pages/Category";
import ToolDetail from "@/pages/ToolDetail";
import News from "@/pages/News";
import Projects from "@/pages/Projects";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative flex min-h-screen flex-col">
        <div className="app-bg" />
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/tool/:id" element={<ToolDetail />} />
            <Route path="/news" element={<News />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
