import { ThemeProvider } from "@/components/ui/theme-provider"
import { Outlet } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { queryClient } from "./services/queryClient";
import { QueryClientProvider } from "@tanstack/react-query"

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Outlet />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
