import { useUser } from "../../lib/context/user";
import { SessionFailure } from "../Auth/SessionFailure";
import { Spin } from "antd";

export function ProtectedRoute({ children }) {
  const user = useUser();

  if (user.loading) {
    return <Spin size="large" fullscreen />;
  }

  if (!user.isSession) {
    return <SessionFailure />;
  }

  return children;
}
