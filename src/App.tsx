import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/layout/AppLayout";
import Overview from "./pages/Overview";
import Transactions from "./pages/Transactions";
import Entities from "./pages/Entities";
import ApiSettings from "./pages/ApiSettings";
import Approvals from "./pages/Approvals";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound.tsx";

import Landing from "./pages/Landing";
import About from "./pages/About";
import AreasOfAction from "./pages/AreasOfAction";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/atuacao" element={<AreasOfAction />} />
          <Route path="/contato" element={<Contact />} />
          <Route element={<AppLayout />}>
            <Route path="/overview" element={<Overview />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/entities" element={<Entities />} />
            <Route path="/approvals" element={<Approvals />} />
            <Route path="/api" element={<ApiSettings />} />
            <Route path="/settings" element={<ApiSettings />} />
            <Route path="/support" element={<Support />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
