import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { UserProvider, useUser } from "./lib/context/user";
import { IdeasProvider } from "./lib/context/ideas";

function App() {
  const isLoginPage = window.location.pathname === "/login";

  return (
    <div>
      <UserProvider>
        <IdeasProvider>
          <Navbar />
          <main style={{width: "100vw", margin: "0 auto", boxSizing: "border-box"}}>
            {isLoginPage 
            ? <Login />
            : <Home />}
          </main>
        </IdeasProvider>
      </UserProvider>
    </div>
  )
}

function Navbar() {
  const user = useUser()
  
  return (
  <nav>
    <a href="/">Ideas tracker</a>
      <div>
        { user.current ? (
          <>
            <span>{user.current.email}</span>
            <button
              type="button"
              onClick={() => user.logout()}
            >
              Logout
            </button>
          </>
        ) : (
          <a href="/login">Login</a>
        )}
      </div>
  </nav>

  )
}
export default App;
