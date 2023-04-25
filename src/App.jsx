import React from "react";
import { ThemeContextProvider } from "./themes";
import { QueryClient, QueryClientProvider } from "react-query";
import { ConfirmProvider } from "material-ui-confirm";
import { SnackbarProvider } from "notistack";
import Router from "./routes/Router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false
    }
  }
});

function App() {

  return (
    <ThemeContextProvider>
      <QueryClientProvider client={queryClient}>
        <ConfirmProvider
          defaultOptions={{
            confirmationText: "Aceptar",
            cancellationText: "Cancelar"
          }}
        >
          <SnackbarProvider
            autoHideDuration={5000}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <Router />
          </SnackbarProvider>
        </ConfirmProvider>
      </QueryClientProvider>
    </ThemeContextProvider>
  )
};

export default App;