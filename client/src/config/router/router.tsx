/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "../../components/pages/sign-up/sign-up";

import { LoginPage } from "../../components/pages/login/login";
import NotFoundPage from "../../components/pages/4_0_4/404";
import AccessDenied from "../../components/pages/access-denied/access-denied";
import { ChangePassword } from "../../components/pages/change-password/change-password";
import { MainPage } from "../../components/pages/main/main";
import ProtectedRoute from "../utils/protected_route";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth-hook";
import { useNavigation } from "../../hooks/navigation-hook";

export const RouterConfig = () => {
  const authenticator = useAuth();
  const navigation = useNavigation();
  const [routing_elements, setRoutingElements] = useState<
    JSX.Element | JSX.Element[]
  >([]);

  useEffect(() => {
    if (authenticator.curr_user) {
      setRoutingElements(
        ProtectedRoute(authenticator.isAuthenticated, authenticator.curr_user)
      );
    } else {
      navigation.setNavigation({
        from: window.location.pathname,
        to: "/login",
      });
      setRoutingElements(<Route path="*" element={<Navigate to="/login" />} />);
    }
  }, [authenticator.curr_user]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/" element={<MainPage />}>
          {routing_elements}
        </Route>
        {<Route path="not-found" element={<NotFoundPage />} />}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};
