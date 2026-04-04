import { useLocation } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  const [, setLocation] = useLocation();
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <AlertCircle className="w-12 h-12 text-bearish mb-4" />
      <h1 className="text-3xl font-bold mono mb-2">404</h1>
      <p className="text-muted-foreground mb-6">Page not found — this route does not exist.</p>
      <button onClick={() => setLocation("/")} className="bg-info/20 text-info px-4 py-2 rounded-md text-sm font-bold hover:bg-info/30 transition-colors">
        Return to Dashboard
      </button>
    </div>
  );
}
