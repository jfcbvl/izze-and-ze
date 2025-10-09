import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import WeddingRSVP from "@/pages/WeddingRSVP";
import { content } from "@/lib/content";

function Router() {
  return (
    <Switch>
      <Route path="/">
        <Redirect to="/en" />
      </Route>
      
      <Route path="/en">
        <WeddingRSVP content={content.en} lang="en" />
      </Route>
      
      <Route path="/pt">
        <WeddingRSVP content={content.pt} lang="pt" />
      </Route>
      
      <Route path="/mx">
        <WeddingRSVP content={content.mx} lang="mx" />
      </Route>
      
      <Route>
        <Redirect to="/en" />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
