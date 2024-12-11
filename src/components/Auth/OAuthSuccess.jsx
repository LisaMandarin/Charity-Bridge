import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function OauthSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const from = params.get("from") || "/";

    setTimeout(() => navigate(from, { replace: true }), 3000);
  }, []);
  return (
    <>
      <p className="flex justify-center m-8 text-3xl">
        Login successful! Redirecting...
      </p>
    </>
  );
}
