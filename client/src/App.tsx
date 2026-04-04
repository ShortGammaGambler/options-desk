import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TierProvider } from "./contexts/TierContext";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import QuantModels from "./pages/QuantModels";
import Strategies from "./pages/Strategies";
import PositionSizing from "./pages/PositionSizing";
import Backtesting from "./pages/Backtesting";
import WalkForward from "./pages/WalkForward";
import MonteCarlo from "./pages/MonteCarlo";
import EfficientFrontier from "./pages/EfficientFrontier";
import VolSurface from "./pages/VolSurface";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <DashboardLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/quant" component={QuantModels} />
        <Route path="/strategies" component={Strategies} />
        <Route path="/sizing" component={PositionSizing} />
        <Route path="/backtest" component={Backtesting} />
        <Route path="/walkforward" component={WalkForward} />
        <Route path="/montecarlo" component={MonteCarlo} />
        <Route path="/frontier" component={EfficientFrontier} />
        <Route path="/volsurface" component={VolSurface} />
        <Route path="/pricing" component={Pricing} />
        <Route component={NotFound} />
      </Switch>
    </DashboardLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TierProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </TierProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
