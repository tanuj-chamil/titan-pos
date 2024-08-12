import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/pages/login-page";
import SplashScreen from "./components/pages/splash-screen";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashsboard" element={<h1>Dashboard</h1>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
