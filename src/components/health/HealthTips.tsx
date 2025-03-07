
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Moon, Droplets, Activity, Brain } from "lucide-react";

type Tip = {
  id: string;
  category: string;
  title: string;
  description: string;
  source?: string;
};

const healthTips: Record<string, Tip[]> = {
  sleep: [
    {
      id: "sleep-1",
      category: "sleep",
      title: "Consistent Sleep Schedule",
      description: "Try to go to bed and wake up at the same time every day, even on weekends, to regulate your body's internal clock.",
      source: "Sleep Foundation"
    },
    {
      id: "sleep-2",
      category: "sleep",
      title: "Create a Restful Environment",
      description: "Keep your bedroom cool, quiet, and dark. Consider using earplugs, an eye mask, or a white noise machine if needed.",
      source: "Mayo Clinic"
    },
    {
      id: "sleep-3",
      category: "sleep",
      title: "Limit Screen Time",
      description: "The blue light from phones, tablets, and computers can interfere with your ability to fall asleep. Try to avoid screens 1-2 hours before bedtime.",
      source: "Harvard Health"
    }
  ],
  water: [
    {
      id: "water-1",
      category: "water",
      title: "Morning Hydration",
      description: "Drink a glass of water first thing in the morning to rehydrate after sleep and kickstart your metabolism.",
      source: "Cleveland Clinic"
    },
    {
      id: "water-2",
      category: "water",
      title: "Infused Water",
      description: "If you find plain water boring, try adding fruits, vegetables, or herbs like lemon, cucumber, or mint for natural flavor.",
      source: "American Heart Association"
    },
    {
      id: "water-3",
      category: "water",
      title: "Hydration Apps",
      description: "Consider using a hydration tracking app that sends reminders throughout the day to help you meet your water intake goals.",
      source: "Healthline"
    }
  ],
  exercise: [
    {
      id: "exercise-1",
      category: "exercise",
      title: "Start Small",
      description: "Begin with just 10 minutes of activity daily and gradually increase. Even short bursts of exercise provide health benefits.",
      source: "CDC"
    },
    {
      id: "exercise-2",
      category: "exercise",
      title: "Mix Cardio & Strength",
      description: "Incorporate both cardiovascular exercise and strength training for optimal health. Aim for at least 2 days of strength training per week.",
      source: "American Heart Association"
    },
    {
      id: "exercise-3",
      category: "exercise",
      title: "Active Throughout Day",
      description: "Take breaks to stand or walk during long periods of sitting. Try to accumulate movement throughout your day.",
      source: "World Health Organization"
    }
  ],
  mental: [
    {
      id: "mental-1",
      category: "mental",
      title: "Mindful Breathing",
      description: "Take 5 minutes daily to focus on your breath. Breathe in for 4 counts, hold for 2, and exhale for 6 to reduce stress.",
      source: "Mindfulness Institute"
    },
    {
      id: "mental-2",
      category: "mental",
      title: "Digital Detox",
      description: "Schedule regular breaks from social media and news consumption to reduce anxiety and improve mental clarity.",
      source: "Psychology Today"
    },
    {
      id: "mental-3",
      category: "mental",
      title: "Gratitude Practice",
      description: "Write down three things you're grateful for each day to increase positive emotions and overall life satisfaction.",
      source: "Journal of Happiness Studies"
    }
  ]
};

const HealthTips = () => {
  const [activeCategory, setActiveCategory] = useState<string>("sleep");
  const [randomTip, setRandomTip] = useState<Tip | null>(null);
  
  useEffect(() => {
    // Get a random tip on component mount
    const allTips = Object.values(healthTips).flat();
    const randomIndex = Math.floor(Math.random() * allTips.length);
    setRandomTip(allTips[randomIndex]);
  }, []);
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "sleep":
        return <Moon className="h-4 w-4" />;
      case "water":
        return <Droplets className="h-4 w-4" />;
      case "exercise":
        return <Activity className="h-4 w-4" />;
      case "mental":
        return <Brain className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  return (
    <div className="health-card animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-health-600" />
          Health Tips
        </h2>
      </div>
      
      {/* Featured Tip */}
      {randomTip && (
        <Card className="mb-6 border-2 border-health-100">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">Tip of the Day</CardTitle>
              <Badge className="bg-health-100 text-health-800 hover:bg-health-200">
                {randomTip.category}
              </Badge>
            </div>
            <CardDescription>{randomTip.title}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">{randomTip.description}</p>
            {randomTip.source && (
              <p className="text-xs text-gray-500 mt-2">Source: {randomTip.source}</p>
            )}
          </CardContent>
        </Card>
      )}
      
      {/* Tips by Category */}
      <Tabs defaultValue="sleep" value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="sleep" className="flex items-center text-xs sm:text-sm">
            <Moon className="h-3.5 w-3.5 mr-1.5 sm:mr-2" /> Sleep
          </TabsTrigger>
          <TabsTrigger value="water" className="flex items-center text-xs sm:text-sm">
            <Droplets className="h-3.5 w-3.5 mr-1.5 sm:mr-2" /> Water
          </TabsTrigger>
          <TabsTrigger value="exercise" className="flex items-center text-xs sm:text-sm">
            <Activity className="h-3.5 w-3.5 mr-1.5 sm:mr-2" /> Exercise
          </TabsTrigger>
          <TabsTrigger value="mental" className="flex items-center text-xs sm:text-sm">
            <Brain className="h-3.5 w-3.5 mr-1.5 sm:mr-2" /> Mental
          </TabsTrigger>
        </TabsList>
        
        {Object.entries(healthTips).map(([category, tips]) => (
          <TabsContent key={category} value={category} className="space-y-4">
            {tips.map(tip => (
              <Card key={tip.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="bg-health-100 p-1.5 rounded-full mr-2">
                      {getCategoryIcon(tip.category)}
                    </div>
                    <CardTitle className="text-base">{tip.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{tip.description}</p>
                  {tip.source && (
                    <p className="text-xs text-gray-500 mt-2">Source: {tip.source}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default HealthTips;
