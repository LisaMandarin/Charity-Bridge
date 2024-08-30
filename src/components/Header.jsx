import { HeaderNav } from "./HeaderNav";
import { HeaderUser } from "./HeaderUser";
import smallLogo from "../assets/images/small-logo.webp"
import '../output.css'
import { Col, Row } from "antd";


export function Header() {
  const headerLogo = (
    <div>
      <img
        src={smallLogo}
        alt="logo image: Charity Bridge"
        className="h-24 w-auto mx-6"     
      />
    </div>
  );

  return (
    <>
      <Row className="bg-pink-200 h-24">
        <Col flex={1} className="h-24">{headerLogo}</Col>
        <Col flex={3} className="h-24"><HeaderNav /></Col>
        <Col flex={1} className="h-24 bg-pink-50"><HeaderUser /></Col>
      </Row>
      
      
      
    </>
    
  );
}
