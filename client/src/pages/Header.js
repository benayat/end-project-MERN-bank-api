import "../style/header.css";
import { Link } from "react-router-dom";
import homeIcon from "../images/homeIcon.png";

const Header = () => {
  const type = window.location.href.split("/")[3];
  return (
    <div>
      <Link to="/">
        <img className={`${type}`} alt="home" src={homeIcon} />
      </Link>
    </div>
  );
};
export default Header;
