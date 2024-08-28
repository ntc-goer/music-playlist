import { BrowserRouter } from "react-router-dom";
import { RouteLink } from "./router";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Notification from "./components/parts/Notification";

const theme = createTheme({
  typography: {
    fontFamily: "MyFont, Arial",
    fontSize: 18,
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Notification>
          <BrowserRouter>
            <RouteLink />
          </BrowserRouter>
        </Notification>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
