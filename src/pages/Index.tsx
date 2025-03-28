import { useEffect } from "react";
import Header from "@/components/layout/Header";
import HealthForm from "@/components/health/HealthForm";
import HealthDashboard from "@/components/health/HealthDashboard";
import HealthRecommendation from "@/components/health/HealthRecommendation";
import HealthGoals from "@/components/health/HealthGoals";
import HealthTips from "@/components/health/HealthTips";
import { HealthProvider } from "@/context/HealthContext";
import { Sparkles, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/components/common/Logo";

const Index = () => {
  useEffect(() => {
    document.title = "HealthTrack - Monitor & Improve Your Health";
  }, []);

  return (
    <HealthProvider>
      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 overflow-hidden">
          <div className="container mx-auto text-center max-w-3xl">
            <div className="inline-flex items-center bg-health-100 text-health-800 rounded-full px-3 py-1.5 text-sm font-medium mb-6 animate-slide-down">
              <Sparkles className="w-4 h-4 mr-1.5 animate-pulse-slow" />
              AI-Powered Health Recommendations
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              Track Your Health. <br />
              <span className="text-health-600 relative after:content-[''] after:absolute after:w-full after:h-1 after:bg-health-200 after:bottom-1 after:left-0 after:z-[-1] after:animate-slide-right">Get Smarter</span> Recommendations.
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in delay-1">
              Simple, intelligent health tracking designed to help you develop better habits and improve your wellbeing with personalized AI recommendations.
            </p>

            <div className="flex justify-center space-x-4 mb-12 animate-fade-in delay-1">
              <Link to="/login" className="bg-health-600 hover:bg-health-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md">
                Get Started
              </Link>
              <Link to="/profile" className="bg-white hover:bg-gray-50 text-health-600 border border-health-200 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md">
                Your Profile
              </Link>
            </div>

            <div className="mt-6 animate-fade-in delay-2">
              <ArrowDown className="h-8 w-8 mx-auto text-health-500 animate-bounce" />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 px-6 bg-gray-50 relative">
          <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white to-transparent"></div>
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 space-y-6">
                <div className="transform transition-all duration-500 hover:scale-[1.02]">
                  <HealthForm />
                </div>
                <div className="transform transition-all duration-500 hover:scale-[1.02]">
                  <HealthGoals />
                </div>
              </div>
              
              <div className="lg:col-span-8 space-y-8">
                <div className="transform transition-all duration-500 hover:scale-[1.01] hover:shadow-lg">
                  <HealthDashboard />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="transform transition-all duration-500 hover:scale-[1.03] hover:shadow-md">
                    <HealthTips />
                  </div>
                  <div className="transform transition-all duration-500 hover:scale-[1.03] hover:shadow-md">
                    <HealthRecommendation />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 bg-white border-t border-gray-100">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <Logo size="sm" className="mb-4 md:mb-0" />
              
              <div className="text-sm text-gray-500">
                Designed for your wellbeing. Track, improve, thrive.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </HealthProvider>
  );
};

export default Index;
