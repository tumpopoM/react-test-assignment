import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "./store/store";
import { Routes, Route } from "react-router-dom";
import { setItems } from "./store/itemSlice";
import Home from "./pages/Home";
import ShapePage from "./pages/ShapePage";
import LanguageSwitcher from "./components/LanguageSwitcher";

function App() {
  const dispatch = useDispatch();

  const items = useSelector((state: RootState) => state.items.items);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("items");

    if (data) {
      dispatch(setItems(JSON.parse(data)));
    }

    setIsLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("items", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to top right, #6eda78, #ffa200)",
      }}
    >
      <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <LanguageSwitcher />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shape" element={<ShapePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
