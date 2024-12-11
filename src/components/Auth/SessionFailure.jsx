import { Link, useLocation } from "react-router-dom";

export function SessionFailure() {
  const location = useLocation();
  const from = location.state?.from || "/"; // Default to home if `from` is not provided

  return (
    <>
      <div className="text-3xl text-center p-4">
        Please{" "}
        <Link
          to="/login"
          state={{ from }}
          className="text-3xl underline hover:text-blue-500 hover:no-underline"
        >
          log in
        </Link>{" "}
        to see more information
      </div>
    </>
  );
}
