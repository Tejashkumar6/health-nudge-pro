
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileDown } from "lucide-react";
import { jsPDF } from "jspdf";
import { toast } from "sonner";

const ProjectQuestionsDoc = () => {
  const generatePDF = () => {
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      
      // Add title
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("HealthTrack Project - Questions and Answers", 20, 20);
      
      // Add content
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      
      const questions = {
        "General Understanding": [
          {
            q: "What is the main purpose of the HealthTrack application?",
            a: "The HealthTrack application is designed to help users monitor their daily health metrics, visualize their health data over time, and receive personalized recommendations for improving their overall wellbeing. It focuses on tracking sleep, water intake, exercise, and mood."
          },
          {
            q: "Who is the target audience for this application?",
            a: "The target audience includes individuals interested in taking a proactive approach to their health, tracking daily health metrics, and receiving personalized recommendations. It's designed for people of all ages who want to develop better health habits."
          },
          {
            q: "How does the application calculate the overall health score?",
            a: "The health score (0-10) is calculated using a weighted formula: Sleep (30%, optimized for 7-8 hours), Water intake (20%, optimized for 8+ glasses), Exercise (30%, optimized for 30+ minutes), and Mood (20%, based on 1-5 scale)."
          }
        ],
        "Technical Implementation": [
          {
            q: "Explain the component structure of this React application.",
            a: "The application follows a modular component structure with main components including HealthForm for data input, HealthDashboard for visualizations, HealthRecommendation for AI advice, and HealthGoals for tracking progress. These components are wrapped in a HealthProvider context that manages the application state."
          },
          {
            q: "How is state management implemented in this application?",
            a: "State management is implemented using React's Context API through the HealthContext provider. This context stores and provides access to health metrics, recommendations, and functions to update them across all components."
          },
          {
            q: "What role does the HealthContext serve?",
            a: "HealthContext serves as a central state management solution that provides health metrics data, recommendations, and related functions to all components without prop drilling. It ensures data consistency throughout the application."
          },
          {
            q: "How does the application generate health recommendations?",
            a: "The application analyzes user-inputted health metrics using the generateRecommendations utility function. It evaluates each metric against optimal values and generates prioritized, category-specific recommendations based on areas needing improvement."
          }
        ],
        "UI/UX Design": [
          {
            q: "How does the UI design support the application's purpose?",
            a: "The UI is designed with a clean, intuitive interface featuring a tracking form, visualization dashboard, and recommendations section. It uses color coding, progress indicators, and charts to make health data easily understandable and actionable."
          },
          {
            q: "What accessibility considerations were made in the design?",
            a: "The application uses semantic HTML, adequate color contrast, clear labeling, and responsive design. Interactive elements are keyboard navigable, and the UI components from shadcn/ui provide built-in accessibility features."
          },
          {
            q: "How does the application handle responsive design?",
            a: "The application uses Tailwind CSS with responsive utility classes to adapt layouts for different screen sizes. It employs grid systems, flexible columns, and responsive spacing to ensure optimal viewing on mobile, tablet, and desktop devices."
          }
        ],
        "Data Visualization": [
          {
            q: "Describe how the visualization of health data is implemented.",
            a: "Health data visualization is implemented using the Recharts library to create bar charts showing trends over time. The application also uses circular progress indicators, linear progress bars, and color-coding to represent health scores and goal completion."
          },
          {
            q: "How does the dashboard help users understand their health patterns?",
            a: "The dashboard presents a comprehensive view of health metrics through an overall health score, individual metric progress bars, and a 7-day trend chart. This allows users to track progress, identify patterns, and understand the relationship between different health factors."
          }
        ],
        "Future Enhancements": [
          {
            q: "What limitations does the current implementation have?",
            a: "Current limitations include: lack of persistent data storage, no user authentication, limited metrics tracking (only 4 metrics), simulated AI recommendations rather than true machine learning, and no integration with external health devices or APIs."
          },
          {
            q: "How could this application be expanded?",
            a: "The application could be expanded by adding: user authentication, data persistence, additional health metrics (nutrition, steps, heart rate, etc.), integration with wearable devices, real AI/ML for personalized insights, social sharing features, and reminder notifications."
          },
          {
            q: "How could machine learning improve the recommendations?",
            a: "Machine learning could analyze patterns in user data over time to identify correlations between metrics and outcomes. It could provide more personalized recommendations based on individual responses to interventions, and adapt suggestions based on user feedback and adherence."
          }
        ]
      };
      
      let yPosition = 30;
      const lineHeight = 7;
      const pageHeight = doc.internal.pageSize.height;
      const margin = 20;
      const contentWidth = doc.internal.pageSize.width - (margin * 2);
      
      // Loop through each section
      Object.entries(questions).forEach(([section, qList]) => {
        // Add section header
        yPosition += lineHeight;
        if (yPosition > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text(section, margin, yPosition);
        yPosition += lineHeight;
        
        // Add questions and answers
        qList.forEach(({ q, a }) => {
          if (yPosition > pageHeight - margin * 2) {
            doc.addPage();
            yPosition = margin;
          }
          
          doc.setFont("helvetica", "bold");
          doc.setFontSize(12);
          
          // Question
          const questionLines = doc.splitTextToSize(`Q: ${q}`, contentWidth);
          doc.text(questionLines, margin, yPosition);
          yPosition += lineHeight * questionLines.length;
          
          // Answer
          doc.setFont("helvetica", "normal");
          const answerLines = doc.splitTextToSize(`A: ${a}`, contentWidth);
          doc.text(answerLines, margin, yPosition);
          yPosition += lineHeight * answerLines.length + 5;
        });
        
        yPosition += 5; // Add space between sections
      });
      
      // Add footer
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");
        doc.text(`HealthTrack Project - Page ${i} of ${totalPages}`, margin, pageHeight - 10);
      }
      
      // Save the PDF
      doc.save("HealthTrack_Project_QA.pdf");
      toast.success("PDF Downloaded Successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <Card className="p-6 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Project Questions and Answers</h2>
        <p className="text-gray-500">Download a comprehensive list of questions and answers about this HealthTrack project</p>
      </div>
      
      <div className="space-y-4">
        <p>This document contains potential questions a teacher might ask about the HealthTrack project, along with detailed answers covering:</p>
        
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>General understanding of the application</li>
          <li>Technical implementation details</li>
          <li>UI/UX design considerations</li>
          <li>Data visualization techniques</li>
          <li>Future enhancement possibilities</li>
        </ul>
        
        <p className="text-sm text-gray-600 italic">
          Perfect for preparing for project presentations or understanding the project's design decisions.
        </p>
      </div>
      
      <div className="mt-6 flex justify-center">
        <Button 
          onClick={generatePDF} 
          className="bg-health-600 hover:bg-health-700 text-white"
        >
          <FileDown className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>
    </Card>
  );
};

export default ProjectQuestionsDoc;
