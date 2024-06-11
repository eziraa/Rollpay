import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "../../components/pages/sign-up/sign-up";
import UpdateEmployee from "../../components/sections/update-employee/update-employee";

import { HomePage } from "../../components/pages/home/home-page";
import { LoginPage } from "../../components/pages/login/login";
export const RouterConfig = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home-page" element={<HomePage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/edit-profile" element={<UpdateEmployee />} />
    </Routes>
  </Router>
);
