
import { useState } from "react";
import { useHealth } from "@/context/HealthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, Edit2, Check, X, Trash2 } from "lucide-react";
import { toast } from "sonner";

type Goal = {
  id: string;
  category: "sleep" | "water" | "exercise" | "mood";
  target: number;
  currentValue: number;
  unit: string;
  completed: boolean;
};

const HealthGoals = () => {
  const { getLatestMetric } = useHealth();
  const latestMetric = getLatestMetric();
  
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "sleep-goal",
      category: "sleep",
      target: 8,
      currentValue: latestMetric?.sleep || 0,
      unit: "hours",
      completed: false
    },
    {
      id: "water-goal",
      category: "water",
      target: 8,
      currentValue: latestMetric?.water || 0,
      unit: "glasses",
      completed: false
    },
    {
      id: "exercise-goal",
      category: "exercise",
      target: 30,
      currentValue: latestMetric?.exercise || 0,
      unit: "min",
      completed: false
    }
  ]);
  
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [editingTarget, setEditingTarget] = useState<number>(0);
  
  // Update goals based on the latest metric
  useState(() => {
    if (latestMetric) {
      setGoals(prevGoals => 
        prevGoals.map(goal => {
          let currentValue = 0;
          switch (goal.category) {
            case "sleep":
              currentValue = latestMetric.sleep;
              break;
            case "water":
              currentValue = latestMetric.water;
              break;
            case "exercise":
              currentValue = latestMetric.exercise;
              break;
            case "mood":
              currentValue = latestMetric.mood;
              break;
          }
          
          return {
            ...goal,
            currentValue,
            completed: currentValue >= goal.target
          };
        })
      );
    }
  });
  
  const handleEditGoal = (goalId: string) => {
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
      setEditingGoalId(goalId);
      setEditingTarget(goal.target);
    }
  };
  
  const handleSaveGoal = (goalId: string) => {
    setGoals(prevGoals => 
      prevGoals.map(goal => 
        goal.id === goalId
          ? { 
              ...goal, 
              target: editingTarget,
              completed: goal.currentValue >= editingTarget
            }
          : goal
      )
    );
    setEditingGoalId(null);
    toast.success("Goal updated!");
  };
  
  const handleCancelEdit = () => {
    setEditingGoalId(null);
  };
  
  const handleResetGoal = (goalId: string) => {
    setGoals(prevGoals => 
      prevGoals.map(goal => 
        goal.id === goalId
          ? { ...goal, completed: false }
          : goal
      )
    );
    toast.success("Goal reset successfully!");
  };
  
  const getCategoryName = (category: string) => {
    switch (category) {
      case "sleep": return "Sleep";
      case "water": return "Water Intake";
      case "exercise": return "Exercise";
      case "mood": return "Mood";
      default: return category;
    }
  };
  
  return (
    <div className="health-card animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold flex items-center">
          <Target className="h-5 w-5 mr-2 text-health-600" />
          Health Goals
        </h2>
      </div>
      
      <div className="space-y-4">
        {goals.map(goal => (
          <Card key={goal.id} className={`border-l-4 ${goal.completed ? 'border-l-green-500' : 'border-l-health-500'}`}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <h3 className="font-medium text-sm">{getCategoryName(goal.category)}</h3>
                  
                  {goal.completed && (
                    <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
                      Completed
                    </Badge>
                  )}
                </div>
                
                <div className="flex space-x-1">
                  {editingGoalId === goal.id ? (
                    <>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0" 
                        onClick={() => handleSaveGoal(goal.id)}
                      >
                        <Check className="h-4 w-4 text-green-600" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0" 
                        onClick={handleCancelEdit}
                      >
                        <X className="h-4 w-4 text-red-600" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0" 
                        onClick={() => handleEditGoal(goal.id)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      {goal.completed && (
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0" 
                          onClick={() => handleResetGoal(goal.id)}
                        >
                          <Trash2 className="h-4 w-4 text-gray-500" />
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm mb-1">
                <div className="text-gray-500">
                  Progress: {goal.currentValue} / 
                  {editingGoalId === goal.id ? (
                    <Input
                      type="number"
                      value={editingTarget}
                      onChange={e => setEditingTarget(Number(e.target.value))}
                      className="w-16 h-6 px-1 py-0 inline-block ml-1"
                    />
                  ) : (
                    goal.target
                  )} {goal.unit}
                </div>
                <div className="font-medium">
                  {Math.min(100, Math.round((goal.currentValue / goal.target) * 100))}%
                </div>
              </div>
              
              <Progress 
                value={Math.min(100, (goal.currentValue / goal.target) * 100)} 
                className={`h-2 ${goal.completed ? 'bg-green-100' : ''}`}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HealthGoals;
