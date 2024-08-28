import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { UserProvider } from "./lib/context/user";
import { IdeasProvider } from "./lib/context/ideas";
import { Header } from "./components/Header";
import { Register } from "./components/Register";
import './output.css'

function App() {
  const isLoginPage = window.location.pathname === "/login";
  const isRegisterPage = window.location.pathname === '/register'

  return (
    <div>
      <UserProvider>
        <IdeasProvider>
          <Header />
          <main 
            style={{
              backgroundColor: "#f5f5f4",
              }}>
            { isLoginPage ? (
              <Login />
            ) : isRegisterPage ? (
              <Register />
            ) : (
              <Home />
            )}
          </main>
        </IdeasProvider>
      </UserProvider>
    </div>
  )
}
export default App;
