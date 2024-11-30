import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Home } from "./interfaz/pantallas/Home";
import { MemoryCards } from "./interfaz/pantallas/MemoryCards";
import { MEMORY_CARDS_ROUTE, HOME_ROUTE } from "./interfaz/navegacion/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_ROUTE} element={<Home />} />
        <Route path={MEMORY_CARDS_ROUTE} element={<MemoryCards />} />
        <Route path="*" element={<Navigate to={HOME_ROUTE} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
