import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import WeddingRSVP from "@/pages/WeddingRSVP";
import RegistryPage from "@/pages/RegistryPage";
import { content } from "@/lib/content";

const langs = ["en", "pt", "mx"] as const;
type Lang = (typeof langs)[number];

const isLang = (s: string | undefined): s is Lang =>
  !!s && (langs as readonly string[]).includes(s);

const anchors = ["program", "travel", "venue-dresscode", "gifts"];

function Router() {
  return (
    <Switch>
      <Route path="/">
        <Redirect to="/en" />
      </Route>

      {/* Full-screen gift flow: /gifts/give/:lang */}
      <Route path="/gifts/give/:lang">
        {(params: { lang: string }) =>
          isLang(params.lang) ? (
            <RegistryPage lang={params.lang} />
          ) : (
            <Redirect to="/gifts/give/en" />
          )
        }
      </Route>

      {/* Section anchors: /:anchor/:lang */}
      <Route path="/:anchor/:lang">
        {(params: { anchor: string; lang: string }) =>
          isLang(params.lang) && anchors.includes(params.anchor) ? (
            <WeddingRSVP
              content={content[params.lang]}
              lang={params.lang}
              anchor={params.anchor}
            />
          ) : (
            <Redirect to="/en" />
          )
        }
      </Route>

      {/* Home: /:lang */}
      <Route path="/:lang">
        {(params: { lang: string }) =>
          isLang(params.lang) ? (
            <WeddingRSVP content={content[params.lang]} lang={params.lang} />
          ) : (
            <Redirect to="/en" />
          )
        }
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
