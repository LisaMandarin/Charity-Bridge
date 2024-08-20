import { Menu } from "../Menu";
import { HeaderUser } from "../HeaderUser";
import './Header.css'

export function Header() {
  const headerLogo = (
    <div style={{margin: '16px'}}>
      <img
        src="src/assets/images/big-logo.webp"
        width="100"
        height="auto"
        alt="logo image: Charity Bridge"
      />
    </div>
  );
  return (
    <div id="header">
      {headerLogo}
      <Menu />
      <HeaderUser />
    </div>
  );
}
