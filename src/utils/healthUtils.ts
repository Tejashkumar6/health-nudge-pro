
import { HealthMetric, HealthRecommendation } from "../context/HealthContext";

// Generate a unique ID for recommendations
export const generateId = () => {
  return Math.random().toString(36).substring(2, 11);
};

// Calculate health score based on metrics
export const calculateHealthScore = (metric: HealthMetric): number => {
  // Sleep: 0-10 scale (ideal is 7-8 hours)
  const sleepScore = metric.sleep >= 7 && metric.sleep <= 8 
    ? 10 
    : 10 - Math.min(10, Math.abs(metric.sleep - 7.5) * 2);
  
  // Water: 0-10 scale (ideal is 8+ glasses)
  const waterScore = Math.min(10, (metric.water / 8) * 10);
  
  // Exercise: 0-10 scale (ideal is 30+ minutes)
  const exerciseScore = Math.min(10, (metric.exercise / 30) * 10);
  
  // Mood: already on 1-5 scale, convert to 0-10
  const moodScore = metric.mood * 2;
  
  // Overall score - weighted average
  return Math.round((sleepScore * 0.3 + waterScore * 0.2 + exerciseScore * 0.3 + moodScore * 0.2) * 10) / 10;
};

// Generate health recommendations based on metrics
export const generateRecommendations = (metric: HealthMetric): HealthRecommendation[] => {
  const recommendations: HealthRecommendation[] = [];
  
  // Sleep recommendations
  if (metric.sleep < 6) {
    recommendations.push({
      id: generateId(),
      category: "sleep",
      title: "Improve Sleep Duration",
      description: "You're sleeping less than 6 hours. Try to establish a consistent sleep schedule and aim for 7-8 hours.",
      priority: "high"
    });
  } else if (metric.sleep > 9) {
    recommendations.push({
      id: generateId(),
      category: "sleep",
      title: "Optimize Sleep Duration",
      description: "You might be oversleeping. Aim for 7-8 hours for optimal health benefits.",
      priority: "medium"
    });
  }
  
  // Water recommendations
  if (metric.water < 6) {
    recommendations.push({
      id: generateId(),
      category: "water",
      title: "Increase Water Intake",
      description: "Try to drink at least 8 glasses of water daily for proper hydration.",
      priority: metric.water < 4 ? "high" : "medium"
    });
  }
  
  // Exercise recommendations
  if (metric.exercise < 20) {
    recommendations.push({
      id: generateId(),
      category: "exercise",
      title: "Increase Physical Activity",
      description: "Aim for at least 30 minutes of moderate exercise daily for better health.",
      priority: "high"
    });
  }
  
  // Mood recommendations
  if (metric.mood <= 2) {
    recommendations.push({
      id: generateId(),
      category: "mood",
      title: "Mood Enhancement Techniques",
      description: "Try meditation, deep breathing exercises, or connect with friends to improve your mood.",
      priority: "high"
    });
  }
  
  // If all metrics are good, provide a general recommendation
  if (recommendations.length === 0) {
    recommendations.push({
      id: generateId(),
      category: "general",
      title: "Great work!",
      description: "You're on track with your health goals. Keep up the good work!",
      priority: "low"
    });
  }
  
  return recommendations;
};

// Advanced AI recommendation simulation
export const getAIRecommendation = (metrics: HealthMetric[]): string => {
  if (metrics.length < 1) return "Start tracking your health metrics to get personalized AI recommendations.";
  
  const latestMetric = metrics[metrics.length - 1];
  const score = calculateHealthScore(latestMetric);
  
  if (score >= 8.5) {
    return "Your health metrics look excellent! You're maintaining a great balance of sleep, hydration, exercise, and mental wellbeing. For further optimization, consider adding variety to your exercise routine and practicing mindfulness.";
  } else if (score >= 7) {
    return "You're doing well overall! To improve further, focus on consistency in your sleep schedule and consider adding 10 more minutes to your daily exercise routine.";
  } else if (score >= 5) {
    return "There's room for improvement in your health routine. Try setting reminders for water intake and prioritize getting 7-8 hours of sleep regularly. Even short walks can boost your exercise minutes.";
  } else {
    return "Let's work on building some healthier habits! Start small - add one glass of water daily, go to bed 15 minutes earlier, and take short walks. These small changes will make a big difference over time.";
  }
};
