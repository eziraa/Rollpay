import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "../../components/pages/login/login";
import { ForgotPassword } from "../../components/pages/forgot_password/forgot_password";
import SignUp from "../../components/pages/signup/SignUp";
export const RouterConfig = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/forgot_password" element={<ForgotPassword />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </Router>
);
