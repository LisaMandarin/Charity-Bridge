import { Route, Routes } from "react-router-dom";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { SessionFailure } from "./components/SessionFailure";
import { OAuthFailure } from "./components/OAuthFailure";
import { FBdelete } from "./components/FBdelete";
import { Dashboard } from "./components/Dashboard";
import { ProductDetail } from "./components/ProductDetail";
import { Verification } from "./components/Verification";
import { PasswordRecovery } from "./components/PasswordRecovery";
import { PasswordForgot } from "./components/PasswordForgot";
import { ProtectedRoute } from "./lib/protectedRoute";
import { OauthSuccess } from "./components/OAuthSuccess";
import { Layout } from "./components/Layout";
import { ProductByCategory } from "./components/ProductByCategory";
import { ProductByUser } from "./components/ProductByUser";


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
            <Route path="/" element={<Home />}/>
            
            {/* protected components */}
            <Route path="/category/:category" element={<ProtectedRoute><ProductByCategory /></ProtectedRoute>}/>
            <Route path="/userProduct/:userId" element={<ProtectedRoute><ProductByUser /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="product/:productId" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/oauthsuccess" element={<ProtectedRoute><OauthSuccess /></ProtectedRoute>}></Route>
          </Route>
        </Routes>  
      </main>
    </div>
  )
}
export default App;
