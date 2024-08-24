import { HeaderNav } from "./HeaderNav";
import { HeaderUser } from "./HeaderUser";
import smallLogo from "../assets/images/small-logo.webp"
import '../output.css'

export function Header() {
  const headerLogo = (
    <div>
      <img
        className="w-fit"
        src={smallLogo}
        alt="logo image: Charity Bridge"
        
      />
    </div>
  );

  return (
    <div className="flex items-center justify-between px-4 bg-pink-200">
      {headerLogo}
      <HeaderNav />
      <HeaderUser />
    </div>
    
  );
}
