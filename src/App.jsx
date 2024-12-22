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
import { MessageBoard } from "./components/Message/MessageBoard";
import { MessageList } from "./components/Dashboard/DashboardMessageList";
import { MessageNew } from "./components/Dashboard/DashboardMessageNew";

function App() {
  return (
    <div>
      <main>
        <Routes>
          <Route element={<Layout />}>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sessionfailure" element={<SessionFailure />} />
            <Route path="passwordrecovery" element={<PasswordRecovery />} />
            <Route path="/passwordforgot" element={<PasswordForgot />} />
            <Route path="/oauthfailure" element={<OAuthFailure />} />
            <Route path="/fbdelete" element={<FBdelete />} />
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<ProductByCategory />} />
            <Route path="/userProduct/:userId" element={<ProductByUser />} />
            <Route path="/product/:productId" element={<ProductDetail />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/verification" element={<Verification />} />
              <Route path="/oauthSuccess" element={<OauthSuccess />} />
              <Route
                path="/messageboard/:sender/:receiver"
                element={<MessageBoard />}
              />
              <Route path="/messagelist" element={<MessageList />} />
              <Route path="/messageNew" element={<MessageNew />} />
            </Route>
            {/* protected components */}
          </Route>
        </Routes>
      </main>
    </div>
  );
}
export default App;
