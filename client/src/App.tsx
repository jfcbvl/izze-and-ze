import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import WeddingRSVP from "@/pages/WeddingRSVP";
import RegistryPage from "@/pages/RegistryPage";
import { content } from "@/lib/content";

const langs = ["en", "pt", "mx"] as const;

function Router() {
  return (
    <Switch>
      <Route path="/">
        <Redirect to="/en" />
      </Route>

      {langs.map((lang) => (
        <Route key={`${lang}-give`} path={`/${lang}/gifts/give`}>
          <RegistryPage lang={lang} />
        </Route>
      ))}

      {langs.map((lang) => (
        <Route key={`${lang}-home`} path={`/${lang}/:anchor?`}>
          {(params: { anchor?: string }) => (
            <WeddingRSVP content={content[lang]} lang={lang} anchor={params.anchor} />
          )}
        </Route>
      ))}

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
