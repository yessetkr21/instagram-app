import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { Feed } from "./components/Feed";
import { CreateProfile } from "./components/CreateProfile";
import { UploadPost } from "./components/UploadPost";
import { Profile } from "./components/Profile";
import { useState } from "react";

export default function App() {
  const [currentView, setCurrentView] = useState<"feed" | "upload" | "profile">("feed");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Authenticated>
        <Header currentView={currentView} setCurrentView={setCurrentView} />
        <main className="flex-1">
          <Content currentView={currentView} />
        </main>
      </Authenticated>
      
      <Unauthenticated>
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Instagram</h1>
              <p className="text-gray-600">Sign up to see photos from your friends</p>
            </div>
            <SignInForm />
          </div>
        </div>
      </Unauthenticated>
      
      <Toaster />
    </div>
  );
}

function Header({ 
  currentView, 
  setCurrentView 
}: { 
  currentView: string;
  setCurrentView: (view: "feed" | "upload" | "profile") => void;
}) {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 h-16 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Instagram</h1>
        
        <nav className="flex items-center gap-6">
          <button
            onClick={() => setCurrentView("feed")}
            className={`p-2 rounded-lg transition-colors ${
              currentView === "feed" 
                ? "bg-blue-100 text-blue-600" 
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            </svg>
          </button>
          
          <button
            onClick={() => setCurrentView("upload")}
            className={`p-2 rounded-lg transition-colors ${
              currentView === "upload" 
                ? "bg-blue-100 text-blue-600" 
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          
          <button
            onClick={() => setCurrentView("profile")}
            className={`p-2 rounded-lg transition-colors ${
              currentView === "profile" 
                ? "bg-blue-100 text-blue-600" 
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </nav>
        
        <SignOutButton />
      </div>
    </header>
  );
}

function Content({ currentView }: { currentView: string }) {
  const currentUser = useQuery(api.users.getCurrentUser);

  if (currentUser === undefined) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (currentUser && !currentUser.profile) {
    return <CreateProfile />;
  }

  switch (currentView) {
    case "feed":
      return <Feed />;
    case "upload":
      return <UploadPost />;
    case "profile":
      return <Profile />;
    default:
      return <Feed />;
  }
}
