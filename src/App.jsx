import { Route, Routes } from "react-router-dom";
import { Register } from "./components/Auth/Register";
import { Login } from "./components/Auth/Login";
import { Home } from "./components/Home/Home";
import { SessionFailure } from "./components/Auth/SessionFailure";
import { OAuthFailure } from "./components/Auth/OAuthFailure";
import { FBdelete } from "./components/Auth/FBdelete";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { ProductDetail } from "./components/Product/ProductDetail";
import { Verification } from "./components/Auth/Verification";
import { PasswordRecovery } from "./components/Auth/PasswordRecovery";
import { PasswordForgot } from "./components/Auth/PasswordForgot";
import { ProtectedRoute } from "./components/utils/protectedRoute";
import { OauthSuccess } from "./components/Auth/OAuthSuccess";
import { Layout } from "./components/Layout";
import { ProductByCategory } from "./components/Product/ProductByCategory";
import { ProductByUser } from "./components/Product/ProductByUser";
import { MessageBoard } from "./components/Message/messageBoard";

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
            <Route path="/messageboard/:sender/:receiver" element={<ProtectedRoute><MessageBoard /></ProtectedRoute>}></Route>
          </Route>
        </Routes>  
      </main>
    </div>
  )
}
export default App;
