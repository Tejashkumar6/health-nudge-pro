
import { useEffect, useState } from "react";
import { useHealth } from "@/context/HealthContext";
import { getAIRecommendation } from "@/utils/healthUtils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Moon, Droplets, Running, SmilePlus, Info } from "lucide-react";

const HealthRecommendation = () => {
  const { recommendations, metrics } = useHealth();
  const [aiRecommendation, setAiRecommendation] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate AI processing delay for a better UX
    setLoading(true);
    const timer = setTimeout(() => {
      setAiRecommendation(getAIRecommendation(metrics));
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [metrics]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "sleep":
        return <Moon className="h-4 w-4" />;
      case "water":
        return <Droplets className="h-4 w-4" />;
      case "exercise":
        return <Running className="h-4 w-4" />;
      case "mood":
        return <SmilePlus className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "medium":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      default:
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    }
  };

  return (
    <div id="recommendations" className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-semibold mb-2">AI Personalized Recommendations</h2>
      
      {/* AI Personalized Recommendation */}
      <div className="health-card border-t-4 border-t-health-500">
        <div className="flex items-start gap-4">
          <div className="bg-health-100 rounded-full p-3 mt-1">
            <Sparkles className="h-6 w-6 text-health-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-1">AI Health Assistant</h3>
            {loading ? (
              <div className="space-y-2 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            ) : (
              <p className="text-gray-600 leading-relaxed">{aiRecommendation}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Individual Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec, index) => (
          <Card key={rec.id} className="overflow-hidden transition-shadow duration-300 hover:shadow-md">
            <div className="h-1.5 bg-health-500 w-full"></div>
            <CardContent className="p-5">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-health-100 p-1.5 rounded-full">
                    {getCategoryIcon(rec.category)}
                  </div>
                  <h3 className="font-medium">{rec.title}</h3>
                </div>
                <Badge 
                  className={`${getPriorityColor(rec.priority)} font-normal animate-fade-in delay-${index + 1}`}
                >
                  {rec.priority} priority
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{rec.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HealthRecommendation;
