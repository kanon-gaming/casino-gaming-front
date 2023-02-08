import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Infrastructure/Router";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
