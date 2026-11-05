import { Switch, Route, Redirect, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import WeddingRSVP from "@/pages/WeddingRSVP";
import RegistryPage from "@/pages/RegistryPage";
import ThankYouPage from "@/pages/ThankYouPage";
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

      <Route path="/thankyou" component={ThankYouPage} />

      <Route path="/gifts/give/:lang">
        {(params: { lang: string }) =>
          isLang(params.lang) ? (
            <RegistryPage lang={params.lang} />
          ) : (
            <Redirect to="/gifts/give/en" />
          )
        }
      </Route>

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
    <WouterRouter base="/izze-and-ze">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </WouterRouter>
  );
}

export default App;
