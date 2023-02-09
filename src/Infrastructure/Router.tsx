import React from "react";

import { Route, Routes } from "react-router-dom";
import { AccountPage } from "../Pages/Account/AccountPage";
import { GamesPage } from "../Pages/Games/GamesPage";

export function Router() {
  return (
    <Routes>
        <Route path="/" element={<AccountPage />} />
        <Route path="/Games" element={<GamesPage />} />
    </Routes>
  );
};

export default Router;
