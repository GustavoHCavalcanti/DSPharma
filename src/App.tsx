import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  B2BRegisterPage,
  CompliancePage,
  ContactPage,
  HomePage,
  InstitutionalPage,
  ProductsPage,
} from "./pages/DsPharmaPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/institucional" element={<InstitutionalPage />} />
          <Route path="/produtos" element={<ProductsPage />} />
          <Route path="/compliance" element={<CompliancePage />} />
          <Route path="/cadastro-b2b" element={<B2BRegisterPage />} />
          <Route path="/contato" element={<ContactPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
