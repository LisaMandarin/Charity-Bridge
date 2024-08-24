import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { UserProvider, useUser } from "./lib/context/user";
import { IdeasProvider } from "./lib/context/ideas";
import { Header } from "./components/Header";

function App() {
  const isLoginPage = window.location.pathname === "/login";

  return (
    <div>
      <UserProvider>
        <IdeasProvider>
          <Header />
          <main>
            {isLoginPage 
            ? <Login />
            : <Home />}
          </main>
        </IdeasProvider>
      </UserProvider>
    </div>
  )
}
export default App;
