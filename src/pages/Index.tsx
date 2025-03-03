
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import HealthForm from "@/components/health/HealthForm";
import HealthDashboard from "@/components/health/HealthDashboard";
import HealthRecommendation from "@/components/health/HealthRecommendation";
import { HealthProvider } from "@/context/HealthContext";
import { Heart, Sparkles, ArrowDown } from "lucide-react";

const Index = () => {
  useEffect(() => {
    document.title = "HealthTrack - Monitor & Improve Your Health";
  }, []);

  return (
    <HealthProvider>
      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="container mx-auto text-center max-w-3xl">
            <div className="inline-flex items-center bg-health-100 text-health-800 rounded-full px-3 py-1.5 text-sm font-medium mb-6 animate-slide-down">
              <Sparkles className="w-4 h-4 mr-1.5" />
              AI-Powered Health Recommendations
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              Track Your Health. <br />
              <span className="text-health-600">Get Smarter</span> Recommendations.
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in delay-1">
              Simple, intelligent health tracking designed to help you develop better habits and improve your wellbeing with personalized AI recommendations.
            </p>

            <div className="mt-12 animate-fade-in delay-2">
              <ArrowDown className="h-8 w-8 mx-auto text-health-500 animate-bounce" />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 px-6 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 space-y-6">
                <HealthForm />
              </div>
              
              <div className="lg:col-span-8 space-y-8">
                <HealthDashboard />
                <HealthRecommendation />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 bg-white border-t border-gray-100">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 mb-4 md:mb-0">
                <Heart className="h-5 w-5 text-health-600" />
                <span className="text-lg font-medium">HealthTrack</span>
              </div>
              
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
