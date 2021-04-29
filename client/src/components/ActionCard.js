import "../style/actionCard.css";
import plusIcon from "../images/plusIcon.png";
import listIcon from "../images/listIcon.jfif";
import { Link } from "react-router-dom";
const ActionCard = (props) => {
  const type = props.headline.split(" ").join("").toLowerCase();
  return (
    <div className="container">
      <div className="card">
        <div className="face face1">
          <div className="content">
            <img alt="" src={props.icon} />
            <h3>{props.headline}</h3>
          </div>
        </div>
        <div className="face face2">
          <div className="content">
            <Link to={`/add/${type.slice(0, -1)}`}>
              <img alt="add icon" src={plusIcon} />
            </Link>
            <Link to={`/list/${type}`}>
              <img alt="list" src={listIcon} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ActionCard;
