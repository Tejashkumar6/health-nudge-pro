
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Activity, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/">
            <Heart className="h-6 w-6 text-health-600" />
          </Link>
          <Link to="/" className="text-xl font-medium">
            HealthTrack
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#dashboard" className="text-sm font-medium text-gray-600 hover:text-health-600 transition-colors">
            Dashboard
          </a>
          <a href="#track" className="text-sm font-medium text-gray-600 hover:text-health-600 transition-colors">
            Track Health
          </a>
          <a href="#recommendations" className="text-sm font-medium text-gray-600 hover:text-health-600 transition-colors">
            Recommendations
          </a>
          <Button 
            className="bg-health-500 hover:bg-health-600 text-white"
            onClick={handleGetStarted}
          >
            <Activity className="mr-2 h-4 w-4" />
            Get Started
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md py-4 px-6 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#dashboard" 
              className="text-sm font-medium py-2 text-gray-600 hover:text-health-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </a>
            <a 
              href="#track" 
              className="text-sm font-medium py-2 text-gray-600 hover:text-health-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Track Health
            </a>
            <a 
              href="#recommendations" 
              className="text-sm font-medium py-2 text-gray-600 hover:text-health-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Recommendations
            </a>
            <Button 
              className="w-full bg-health-500 hover:bg-health-600 text-white"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/login");
              }}
            >
              <Activity className="mr-2 h-4 w-4" />
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
