import React from "react";

import { Route, Routes } from "react-router-dom";
import { AccountPage } from "../Pages/Account/AccountPage";

export function Router() {
  return (
    <Routes>
        <Route path="/" element={<AccountPage />} />
    </Routes>
  );
};

export default Router;
