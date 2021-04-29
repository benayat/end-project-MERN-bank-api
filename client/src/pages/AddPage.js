import "../style/addPage.css";
import { useParams } from "react-router";
import UploadForm from "../components/UploadForm";
import { chooseType } from "../utils/schemas";
import { useEffect, useState } from "react";
const AddPage = ({ icons }) => {
  const objectType = useParams().collectionType;
  const [logoIconName, setLogoIconName] = useState(null);
  const [inputChoise, setInputChoise] = useState("Keyboard");

  useEffect(() => {
    const loader = async () => {
      objectType && setLogoIconName(`${chooseType(objectType)}Icon`);
    };
    loader();
  }, [objectType]);
  const onValueChange = (e) => {
    setInputChoise(e.target.value);
  };
  return (
    objectType &&
    logoIconName && (
      <div className="addPage">
        <img
          alt={objectType}
          src={(() => {
            return icons[logoIconName];
          })()}
        />
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Keyboard"
              checked={inputChoise === "Keyboard"}
              onChange={onValueChange}
            />
            Keyboard
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Pen"
              checked={inputChoise === "Pen"}
              onChange={onValueChange}
            />
            Pen
          </label>
        </div>
        <UploadForm inputChoise={inputChoise} objectType={objectType} />
      </div>
    )
  );
};
export default AddPage;
