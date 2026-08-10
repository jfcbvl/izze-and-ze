import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import WeddingRSVP from "@/pages/WeddingRSVP";
import RegistryPage from "@/pages/RegistryPage";
import DressCodePage from "@/pages/DressCodePage";
import { content } from "@/lib/content";

const langs = ["en", "pt", "mx"] as const;

function Router() {
  return (
    <Switch>
      <Route path="/">
        <Redirect to="/en" />
      </Route>

      {langs.map((lang) => (
        <Route key={`${lang}-home`} path={`/${lang}`}>
          <WeddingRSVP content={content[lang]} lang={lang} />
        </Route>
      ))}

      {langs.map((lang) => (
        <Route key={`${lang}-gifts`} path={`/${lang}/gifts`}>
          <RegistryPage lang={lang} />
        </Route>
      ))}

      {langs.map((lang) => (
        <Route key={`${lang}-dress-code`} path={`/${lang}/dress-code`}>
          <DressCodePage lang={lang} />
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
