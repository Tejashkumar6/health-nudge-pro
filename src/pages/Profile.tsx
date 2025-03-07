
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { UserCircle, Save, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("User");
  const [email, setEmail] = useState("user@example.com");
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Profile updated successfully!");
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-health-50 to-health-100 pt-20 px-4 pb-12">
      <div className="container mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-health-600 hover:text-health-700 transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Link>
        
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback className="bg-health-100 text-health-700">
                  <UserCircle className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <CardTitle>{name}</CardTitle>
              <p className="text-sm text-gray-500">{email}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Age:</span>
                  <span className="font-medium">{age} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Weight:</span>
                  <span className="font-medium">{weight} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Height:</span>
                  <span className="font-medium">{height} cm</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Edit Profile Form */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Age</label>
                    <Input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Age"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Weight (kg)</label>
                    <Input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="Weight"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Height (cm)</label>
                    <Input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="Height"
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-health-600 hover:bg-health-700 text-white mt-4"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Profile
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
