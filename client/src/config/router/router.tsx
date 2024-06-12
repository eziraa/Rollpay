import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "../../components/pages/sign-up/sign-up";

import { HomePage } from "../../components/pages/home/home-page";
import { LoginPage } from "../../components/pages/login/login";
import ProtectedRoute from "../utils/protected_route";
import NotFoundPage from "../../components/pages/4_0_4/404";
export const RouterConfig = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/home-page"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);
