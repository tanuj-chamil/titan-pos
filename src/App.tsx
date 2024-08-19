import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/pages/login-page";
import SplashScreen from "./components/pages/splash-screen";
import PosMenu from "./components/pages/pos-menu";
import { ThemeProvider } from "./components/ui/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <HashRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/posmenu" element={<PosMenu/>} />
      </Routes>
    </HashRouter>
    </ThemeProvider>
  );
}

export default App;
