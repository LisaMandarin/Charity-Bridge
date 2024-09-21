import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./lib/context/user";
import { UserInfosProvider } from "./lib/context/userInfo";
import { StorageProvider } from "./lib/context/storage";
import { Header } from "./components/Header";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Footer } from "./components/Footer";
import { Food } from "./components/Food";
import { Clothing } from "./components/Clothing";
import { Housing } from "./components/Housing";
import { Transportation } from "./components/Transportation";
import { Education } from "./components/Education";
import { Entertainment } from "./components/Entertainment";
import { Failure } from "./components/Failure";
import { FBdelete } from "./components/FBdelete";
import { Dashboard } from "./components/Dashboard";
import { Verification } from "./components/Verification";
import { PasswordRecovery } from "./components/PasswordRecovery";
import { PasswordForgot } from "./components/PasswordForgot";

function App() {
  
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <UserProvider>
        <StorageProvider>
          <UserInfosProvider>
            <header className="bg-pink-200 h-24">
              <Header />
            </header>
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />}/>
                <Route path="/food" element={<Food />} />
                <Route path="/clothing" element={<Clothing />} />
                <Route path="/housing" element={<Housing />} />
                <Route path="/transportation" element={<Transportation />} />
                <Route path="/education" element={<Education />} />
                <Route path="/entertainment" element={<Entertainment />} />
                <Route path="/failure" element={<Failure />} />
                <Route path="/fbdelete" element={<FBdelete />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/verification" element={<Verification />} />
                <Route path="passwordrecovery" element={<PasswordRecovery />} />
                <Route path="/passwordforgot" element={<PasswordForgot />} />
              </Routes>
            </main>
            <footer className="bg-pink-200 h-14">
              <Footer />
            </footer>
          </UserInfosProvider>
        </StorageProvider>
      </UserProvider>
    </div>
  )
}
export default App;
