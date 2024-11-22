import { HeaderNavH } from "./HeaderNavH";
import { HeaderNavV } from "./HeaderNavV";
import { HeaderUser } from "./HeaderUser";
import smallLogo from "../../assets/images/small-logo.webp";
import { Col, Row } from "antd";
import { categoryItems } from "./HeaderCategory";
import { Link } from "react-router-dom";

export function Header() {
  const headerLogo = (
    <div>
      <img
        src={smallLogo}
        alt="logo image: Charity Bridge"
        className="h-24 w-auto mx-auto"
      />
    </div>
  );

  return (
    <>
      <Row className="h-full leading-10">
        <Col flex={1} className="h-full ml-4">
          <Link to="/">{headerLogo}</Link>
        </Col>
        <Col flex={3} className="h-full">
          <div className="hidden md:block h-full">
            <HeaderNavH items={categoryItems} />
          </div>
          <div className="block md:hidden h-full">
            <HeaderNavV items={categoryItems} />
          </div>
        </Col>
        <Col flex={1} className="h-full mr-4 bg-pink-50 max-w-fit">
          <HeaderUser />
        </Col>
      </Row>
    </>
  );
}
