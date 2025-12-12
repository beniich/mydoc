import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Dashboard } from "@/pages/Dashboard";
import Settings from "@/pages/Settings";

const pageConfig: Record<string, { title: string; subtitle: string }> = {
  "/": { title: "Overview", subtitle: "Detailed information about your business" },
  "/leaderboard": { title: "Leaderboard", subtitle: "Performance rankings" },
  "/spreadsheets": { title: "Spreadsheets", subtitle: "Data tables and reports" },
  "/administration": { title: "Administration", subtitle: "Admin controls and settings" },
  "/sales": { title: "Sales", subtitle: "Sales reports and analytics" },
  "/schedule": { title: "Schedule", subtitle: "Calendar and events" },
  "/messages": { title: "Messages", subtitle: "Internal communication" },
  "/library": { title: "Library", subtitle: "Resources and documents" },
  "/settings": { title: "Settings", subtitle: "System configuration" },
  "/support": { title: "Support", subtitle: "Help center and FAQs" },
};

const Index = () => {
  const [currentPage, setCurrentPage] = useState("/");

  const renderPage = () => {
    switch (currentPage) {
      case "/":
        return <Dashboard />;
      case "/settings":
        return <Settings />;
      default:
        return (
          <div className="p-6 flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {pageConfig[currentPage]?.title || "Page"}
              </h2>
              <p className="text-muted-foreground">Coming soon...</p>
            </div>
          </div>
        );
    }
  };

  const config = pageConfig[currentPage] || { title: "AI Studio", subtitle: "" };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="ml-64 transition-all duration-300">
        <Header title={config.title} subtitle={config.subtitle} />
        <div className="animate-fade-in">{renderPage()}</div>
      </main>
    </div>
  );
};

export default Index;
