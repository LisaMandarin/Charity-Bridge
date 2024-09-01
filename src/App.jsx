import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./lib/context/user";
import { UserInfosProvider } from "./lib/context/userInfo";
import { HeaderContent } from "./components/Header";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { FooterContent } from "./components/Footer";
import { Layout } from "antd";
import './output.css'
const { Header, Content, Footer } = Layout

function App() {
  
  return (
    <div>
      <UserProvider>
        <UserInfosProvider>
          <Router>
            <Layout className="h-screen">
              <Header className="bg-pink-200 h-24">
                <HeaderContent />
              </Header>
              <Content className="bg-slate-200 border">
                <main className="flex-col justify-center align-middle">
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path='register' element={<Register />} />
                  </Routes>
                </main> 
              </Content>
              <FooterContent />
            </Layout>
            
          </Router>
          
          <FooterContent />
        </UserInfosProvider>
      </UserProvider>
    </div>
  )
}
export default App;
