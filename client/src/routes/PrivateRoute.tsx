import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { Profile } from "../pages/Profile";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function Private() {
  return (
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  );
}

export default Private;
