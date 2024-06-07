import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "../../components/pages/login/login";
import { ForgotPassword } from "../../components/pages/forgot_password/forgot_password";
import SignUp from "../../components/pages/signup/SignUp";
import UpdateEmployee from "../../components/sections/updateEmployee/UpdateEmployee";
import { HomePage } from "../../components/pages/home/homepage";
export const RouterConfig = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/forgot_password" element={<ForgotPassword />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/add-employee" element={<HomePage />} />
      <Route path="/edit-profile" element={<UpdateEmployee />} />
    </Routes>
  </Router>
);
