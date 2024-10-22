import { Route, Routes } from "react-router-dom";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Food } from "./components/Food";
import { Clothing } from "./components/Clothing";
import { Housing } from "./components/Housing";
import { Transportation } from "./components/Transportation";
import { Education } from "./components/Education";
import { Entertainment } from "./components/Entertainment";
import { SessionFailure } from "./components/SessionFailure";
import { OAuthFailure } from "./components/OAuthFailure";
import { FBdelete } from "./components/FBdelete";
import { Dashboard } from "./components/Dashboard";
import { Verification } from "./components/Verification";
import { PasswordRecovery } from "./components/PasswordRecovery";
import { PasswordForgot } from "./components/PasswordForgot";
import { ProtectedRoute } from "./lib/protectedRoute";
import { OauthSuccess } from "./components/OAuthSuccess";
import { Layout } from "./components/Layout";



function App() {
  
  return (
    <div >
      <main >
        <Routes>
          <Route element={<Layout />}>  
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />}/>
            <Route path="/sessionfailure" element={<SessionFailure />} />       
            <Route path="passwordrecovery" element={<PasswordRecovery />} />
            <Route path="/passwordforgot" element={<PasswordForgot />} />
            <Route path="/oauthfailure" element={<OAuthFailure />} />
            <Route path="/fbdelete" element={<FBdelete />} />
            
            {/* protected components */}
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
            <Route path="/food" element={<ProtectedRoute><Food /></ProtectedRoute>} />
            <Route path="/clothing" element={<ProtectedRoute><Clothing /></ProtectedRoute>} />
            <Route path="/housing" element={<ProtectedRoute><Housing /></ProtectedRoute>} />
            <Route path="/transportation" element={<ProtectedRoute><Transportation /></ProtectedRoute>} />
            <Route path="/education" element={<ProtectedRoute><Education /></ProtectedRoute>} />
            <Route path="/entertainment" element={<ProtectedRoute><Entertainment /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/oauthsuccess" element={<ProtectedRoute><OauthSuccess /></ProtectedRoute>}></Route>
          </Route>
        </Routes>  
      </main>
    </div>
  )
}
export default App;
