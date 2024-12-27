import { HeaderNavH } from "./HeaderNavH";
import { HeaderNavV } from "./HeaderNavV";
import { HeaderUser } from "./HeaderUser";
import smallLogo from "../../assets/images/small-logo.webp";
import { categoryItems } from "./HeaderCategory";
import { Link } from "react-router-dom";

export function Header() {
  const headerLogo = (
    <div>
      <Link to="/">
        <img
          src={smallLogo}
          alt="logo image: Charity Bridge"
          className="h-24 w-auto mx-auto"
        />
      </Link>
    </div>
  );

  return (
    <div className="flex justify-around">
      <div className="block md:hidden">
        <HeaderNavV items={categoryItems} />
      </div>
      {headerLogo}
      <div className="hidden md:flex items-center">
        <HeaderNavH items={categoryItems} />
      </div>
      <HeaderUser />
    </div>
  );
}
