import { HeaderNavH } from "./HeaderNavH";
import { HeaderNavV } from "./HeaderNavV";
import { HeaderUser } from "./HeaderUser";
import smallLogo from "../../assets/images/small-logo.webp";
import { Col, Row, Space } from "antd";
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
    <div className="h-full flex justify-around">
      {headerLogo}
      <div className="block md:hidden">
        <HeaderNavV items={categoryItems} />
      </div>
      <div className="hidden md:block">
        <HeaderNavH items={categoryItems} />
      </div>
      <HeaderUser />
    </div>
  );
}
