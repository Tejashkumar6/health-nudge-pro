import { createContext, useContext, useState, ReactNode } from "react";

export type HealthMetric = {
  date: string;
  sleep: number;
  water: number;
  exercise: number;
  mood: number;
  notes: string;
};

export type HealthRecommendation = {
  id: string;
  category: "sleep" | "water" | "exercise" | "mood" | "general";
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
};

interface HealthContextType {
  metrics: HealthMetric[];
  recommendations: HealthRecommendation[];
  addMetric: (metric: HealthMetric) => void;
  getLatestMetric: () => HealthMetric | null;
  addRecommendation: (recommendation: HealthRecommendation) => void;
}

const initialMetrics: HealthMetric[] = [
  {
    date: new Date().toISOString().split("T")[0],
    sleep: 7,
    water: 6,
    exercise: 30,
    mood: 4,
    notes: "Feeling good today"
  }
];

const initialRecommendations: HealthRecommendation[] = [
  {
    id: "1",
    category: "general",
    title: "Welcome to Health Tracker",
    description: "Start tracking your health metrics daily for personalized recommendations.",
    priority: "medium"
  }
];

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export function HealthProvider({ children }: { children: ReactNode }) {
  const [metrics, setMetrics] = useState<HealthMetric[]>(initialMetrics);
  const [recommendations, setRecommendations] = useState<HealthRecommendation[]>(initialRecommendations);

  const addMetric = (metric: HealthMetric) => {
    setMetrics(prev => [...prev, metric]);
  };

  const getLatestMetric = () => {
    if (metrics.length === 0) return null;
    return metrics[metrics.length - 1];
  };

  const addRecommendation = (recommendation: HealthRecommendation) => {
    setRecommendations(prev => {
      // Avoid duplicates
      if (prev.some(r => r.title === recommendation.title)) {
        return prev;
      }
      // Keep maximum 5 recommendations
      const newRecommendations = [...prev, recommendation];
      if (newRecommendations.length > 5) {
        newRecommendations.shift();
      }
      return newRecommendations;
    });
  };

  return (
    <HealthContext.Provider value={{ 
      metrics, 
      recommendations, 
      addMetric, 
      getLatestMetric,
      addRecommendation 
    }}>
      {children}
    </HealthContext.Provider>
  );
}

export function useHealth() {
  const context = useContext(HealthContext);
  if (context === undefined) {
    throw new Error("useHealth must be used within a HealthProvider");
  }
  return context;
}
