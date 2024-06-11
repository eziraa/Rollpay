import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "../../components/pages/sign-up/sign-up";
import UpdateEmployee from "../../components/sections/update-employee/update-employee";
import { ForgotPassword } from "../../components/pages/forgot-password/forgot-password";
import { LoginPage } from "../../components/pages/login/login";
import { HomePage } from "../../components/pages/home/home-page";
export const RouterConfig = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home-page" element={<HomePage />} />
      <Route path="/forgot_password" element={<ForgotPassword />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/edit-profile" element={<UpdateEmployee />} />
    </Routes>
  </Router>
);
