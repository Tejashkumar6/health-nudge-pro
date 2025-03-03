
import { useState } from "react";
import { useHealth, type HealthMetric } from "@/context/HealthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { generateRecommendations } from "@/utils/healthUtils";
import { toast } from "sonner";
import { Moon, Droplets, Activity, SmilePlus } from "lucide-react";

const HealthForm = () => {
  const { addMetric, addRecommendation } = useHealth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<Omit<HealthMetric, "date">>({
    sleep: 7,
    water: 6,
    exercise: 30,
    mood: 3,
    notes: ""
  });

  const handleSliderChange = (name: keyof typeof formData, value: number[]) => {
    setFormData({ ...formData, [name]: value[0] });
  };

  const handleInputChange = (name: keyof typeof formData, value: string | number) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const today = new Date().toISOString().split("T")[0];
    const newMetric: HealthMetric = {
      date: today,
      ...formData
    };

    // Add a small delay to simulate processing and show the loading state
    setTimeout(() => {
      addMetric(newMetric);
      
      // Generate and add recommendations
      const recommendations = generateRecommendations(newMetric);
      recommendations.forEach(recommendation => {
        addRecommendation(recommendation);
      });
      
      toast.success("Health data saved successfully!");
      setIsSubmitting(false);
      
      // Reset form notes field but keep other values
      setFormData(prev => ({
        ...prev,
        notes: ""
      }));
      
      // Scroll to recommendations section
      document.getElementById("recommendations")?.scrollIntoView({ behavior: "smooth" });
    }, 800);
  };

  return (
    <div id="track" className="health-card animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6">Track Your Health</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sleep Tracking */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium flex items-center">
              <Moon className="w-4 h-4 mr-1.5 text-health-700" />
              Sleep Duration
            </label>
            <span className="text-sm font-semibold bg-health-100 px-2 py-1 rounded-md">
              {formData.sleep} hours
            </span>
          </div>
          <Slider 
            value={[formData.sleep]} 
            min={0} 
            max={12} 
            step={0.5}
            onValueChange={(value) => handleSliderChange("sleep", value)}
            className="py-1"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0h</span>
            <span>6h</span>
            <span>12h</span>
          </div>
        </div>

        {/* Water Intake */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium flex items-center">
              <Droplets className="w-4 h-4 mr-1.5 text-health-700" />
              Water Intake
            </label>
            <span className="text-sm font-semibold bg-health-100 px-2 py-1 rounded-md">
              {formData.water} glasses
            </span>
          </div>
          <Slider 
            value={[formData.water]} 
            min={0} 
            max={12} 
            step={1}
            onValueChange={(value) => handleSliderChange("water", value)}
            className="py-1"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0</span>
            <span>6</span>
            <span>12</span>
          </div>
        </div>

        {/* Exercise Duration */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium flex items-center">
              <Activity className="w-4 h-4 mr-1.5 text-health-700" />
              Exercise Duration
            </label>
            <span className="text-sm font-semibold bg-health-100 px-2 py-1 rounded-md">
              {formData.exercise} minutes
            </span>
          </div>
          <Slider 
            value={[formData.exercise]} 
            min={0} 
            max={120} 
            step={5}
            onValueChange={(value) => handleSliderChange("exercise", value)}
            className="py-1"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0m</span>
            <span>60m</span>
            <span>120m</span>
          </div>
        </div>

        {/* Mood Tracking */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium flex items-center">
              <SmilePlus className="w-4 h-4 mr-1.5 text-health-700" />
              Mood (1-5)
            </label>
            <span className="text-sm font-semibold bg-health-100 px-2 py-1 rounded-md">
              {formData.mood}/5
            </span>
          </div>
          <Slider 
            value={[formData.mood]} 
            min={1} 
            max={5} 
            step={1}
            onValueChange={(value) => handleSliderChange("mood", value)}
            className="py-1"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>😞 1</span>
            <span>😐 3</span>
            <span>😊 5</span>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Notes (optional)</label>
          <Textarea
            value={formData.notes}
            onChange={(e) => handleInputChange("notes", e.target.value)}
            placeholder="How are you feeling today? Any notable events?"
            className="health-input resize-none h-24"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-health-600 hover:bg-health-700 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Health Data"}
        </Button>
      </form>
    </div>
  );
};

export default HealthForm;
