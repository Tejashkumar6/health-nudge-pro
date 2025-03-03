
import { useEffect, useState } from "react";
import { useHealth } from "@/context/HealthContext";
import { calculateHealthScore } from "@/utils/healthUtils";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Calendar, Clock, Droplet, Activity, Heart } from "lucide-react";

const HealthDashboard = () => {
  const { metrics, getLatestMetric } = useHealth();
  const [healthScore, setHealthScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const latestMetric = getLatestMetric();
    
    if (latestMetric) {
      // Simulate a loading state for a smoother experience
      setTimeout(() => {
        setHealthScore(calculateHealthScore(latestMetric));
        setLoading(false);
      }, 500);
    } else {
      setLoading(false);
    }
  }, [metrics, getLatestMetric]);

  // Prepare chart data - last 7 days
  const chartData = metrics
    .slice(-7)
    .map(metric => ({
      date: new Date(metric.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      sleep: metric.sleep,
      water: metric.water,
      exercise: metric.exercise / 12, // Normalize to similar scale
      mood: metric.mood * 2, // Scale to 10
    }));

  const latestMetric = getLatestMetric();

  return (
    <div id="dashboard" className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-semibold mb-2">Your Health Dashboard</h2>
      
      {loading ? (
        <div className="health-card flex items-center justify-center h-48 animate-pulse-slow">
          <span className="text-muted-foreground">Loading your health data...</span>
        </div>
      ) : latestMetric ? (
        <>
          {/* Health Score */}
          <div className="health-card">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">Health Score</h3>
              <span className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative h-32 w-32 flex-shrink-0">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-health-600">{healthScore}</span>
                </div>
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#E0F2FE"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#0EA5E9"
                    strokeWidth="10"
                    strokeDasharray={`${healthScore * 28.27} 282.7`}
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
              </div>
              
              <div className="space-y-4 flex-1">
                <div>
                  <div className="flex justify-between mb-1 text-sm font-medium">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1 text-health-600" /> Sleep
                    </span>
                    <span>{latestMetric.sleep} hours</span>
                  </div>
                  <Progress value={Math.min(100, (latestMetric.sleep / 8) * 100)} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm font-medium">
                    <span className="flex items-center">
                      <Droplet className="w-3 h-3 mr-1 text-health-600" /> Water
                    </span>
                    <span>{latestMetric.water} glasses</span>
                  </div>
                  <Progress value={Math.min(100, (latestMetric.water / 8) * 100)} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm font-medium">
                    <span className="flex items-center">
                      <Activity className="w-3 h-3 mr-1 text-health-600" /> Exercise
                    </span>
                    <span>{latestMetric.exercise} min</span>
                  </div>
                  <Progress value={Math.min(100, (latestMetric.exercise / 30) * 100)} className="h-2" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Health Trends */}
          <div className="health-card">
            <h3 className="text-lg font-medium mb-4">Health Trends</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px', 
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
                      border: 'none' 
                    }} 
                  />
                  <Bar dataKey="sleep" fill="#38BDF8" radius={[4, 4, 0, 0]} name="Sleep (hours)" />
                  <Bar dataKey="water" fill="#7DD3FC" radius={[4, 4, 0, 0]} name="Water (glasses)" />
                  <Bar dataKey="exercise" fill="#0EA5E9" radius={[4, 4, 0, 0]} name="Exercise (scaled)" />
                  <Bar dataKey="mood" fill="#0369A1" radius={[4, 4, 0, 0]} name="Mood (scale 1-10)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      ) : (
        <div className="health-card flex items-center justify-center h-48">
          <div className="text-center">
            <Heart className="h-10 w-10 text-health-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-1">No Health Data Yet</h3>
            <p className="text-muted-foreground text-sm">
              Start tracking your health to see your dashboard
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthDashboard;
