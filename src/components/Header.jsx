import { HeaderNavH } from "./HeaderNavH";
import { HeaderNavV } from "./HeaderNavV";
import { HeaderUser } from "./HeaderUser";
import smallLogo from "../assets/images/small-logo.webp"
import { Col, Row } from "antd";
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

  const items = [
      {
          key: 1,
          icon: 'fluent:food-16-regular',
          text: 'Food',
          path: '/food',
      },
      {
          key: 2,
          icon: 'hugeicons:clothes',
          text: 'Clothing',
          path: '/clothing',
      },
      {
          key: 3,
          icon: 'lucide:house-plus',
          text: 'Housing',
          path: '/housing',
      },
      {
          key: 4,
          icon: 'hugeicons:car-01',
          text: 'Transportation',
          path: '/transportation',
      },
      {
          key: 5,
          icon: 'streamline:quality-education',
          text: 'Education',
          path: '/education',
      },
      {
          key: 6,
          icon: 'iconoir:gift',
          text: 'Entertainment',
          path: '/entertainment',
      },
  ]

  return (
    <>
      <Row className="h-full leading-10">
        <Col flex={1} className="h-full ml-4">
          <Link to='/'>{headerLogo}</Link>
        </Col>
        <Col flex={3} className="h-full">
          <div className="hidden md:block h-full">
            <HeaderNavH items={items} />
          </div>
          <div className="block md:hidden h-full">
            <HeaderNavV items={items} />
          </div>
        </Col>
        <Col flex={1} className="h-full mr-4 bg-pink-50 max-w-fit">
          <HeaderUser />
        </Col>
      </Row>
    </>
    
  );
}
