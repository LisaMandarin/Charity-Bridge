import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { UserProvider } from "./lib/context/user";
import { IdeasProvider } from "./lib/context/ideas";
import { Header } from "./components/Header";
import { Register } from "./components/Register";
import './output.css'
import { UserInfosProvider } from "./lib/context/userInfo";

function App() {
  const isLoginPage = window.location.pathname === "/login";
  const isRegisterPage = window.location.pathname === '/register'

  return (
    <div>
      <UserProvider>
        <UserInfosProvider>
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
        </UserInfosProvider>
      </UserProvider>
    </div>
  )
}
export default App;
