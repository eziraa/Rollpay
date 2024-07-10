import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "../../components/pages/sign-up/sign-up";

import { LoginPage } from "../../components/pages/login/login";
import ProtectedRoute from "../utils/protected_route";
import NotFoundPage from "../../components/pages/4_0_4/404";
import AccessDenied from "../../components/pages/access-denied/access-denied";
import { ChangePassword } from "../../components/pages/change-password/change-password";
import { MainPage } from "../../components/pages/main/main";
export const RouterConfig = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MainPage />}>
        {ProtectedRoute()}
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/access-denied" element={<AccessDenied />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);
