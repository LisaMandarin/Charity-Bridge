import { HeaderNav } from "./HeaderNav";
import { HeaderUser } from "./HeaderUser";
import smallLogo from "../assets/images/small-logo.webp"
import '../output.css'
import { Col, Row } from "antd";
import { Link } from "react-router-dom";


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
      <Row className="h-full leading-10">
        <Col flex={1} className="h-full"><Link to='/'>{headerLogo}</Link></Col>
        <Col flex={3} className="h-full"><HeaderNav /></Col>
        <Col flex={1} className="h-full bg-pink-50"><HeaderUser /></Col>
      </Row>
    </>
    
  );
}
