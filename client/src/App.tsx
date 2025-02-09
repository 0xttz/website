import { Switch, Route } from "wouter";
import { Navigation } from "@/components/navigation";
import { AnimatePresence } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Projects from "@/pages/projects";
import Thoughts from "@/pages/thoughts";

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/projects" component={Projects} />
        <Route path="/thoughts" component={Thoughts} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Navigation />
      <Router />
    </HelmetProvider>
  );
}

export default App;
