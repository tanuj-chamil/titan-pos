import { zoomies } from "ldrs";
import { Orbit } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

zoomies.register();

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 2500);
  }, []);

  return (
    <div className="flex flex-col min-h-dvh justify-center items-center gap-4">
      <Orbit size={64}></Orbit>
      <h1 className="text-3xl font-bold">TitanPOS</h1>
      <div className="mt-4 mb-2">
        <l-zoomies
          size="240"
          stroke="5"
          bg-opacity="0.1"
          speed="1.25"
          color="#222222"
        ></l-zoomies>
      </div>
      <p>Developed by Snap86</p>
    </div>
  );
}

export default SplashScreen;
