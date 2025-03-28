
import React from "react";
import { Heart } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

const Logo = ({ size = "md", showText = true, className = "" }: LogoProps) => {
  // Size mapping for heart icon
  const sizeMap = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-10 w-10",
  };

  // Size mapping for text
  const textSizeMap = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <Heart 
          className={`${sizeMap[size]} text-health-600 animate-pulse-slow`} 
          fill="#e0f2fe" 
          strokeWidth={2}
        />
      </div>
      {showText && (
        <span className={`font-medium ${textSizeMap[size]}`}>
          Health<span className="text-health-600">Track</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
