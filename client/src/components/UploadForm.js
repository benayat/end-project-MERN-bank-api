import "../style/uploadForm.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { createInterface, chooseType } from "../utils/schemas";
import VButton from "../images/V-Button.png";
import PenInput from "./PenInput";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
const UploadForm = ({ objectType, inputChoise }) => {
  const [schema, setSchema] = useState(null);
  const [images, setImages] = useState({});
  const [ocrResults, setOcrResults] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSchema(createInterface[`${chooseType(objectType)}Schema`]);
  }, [objectType]);
  useEffect(() => {}, [inputChoise]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (inputChoise === "Pen") {
      const toArray = Object.entries(images);
      console.log(images);
      // console.log(toArray);
      const resultArray = [];
      for (let i = 0; i < toArray.length; i++) {
        let result = (
          await axios.post("/api/ocr", {
            keyProp: toArray[i][0],
            base64Image: toArray[i][1],
          })
        ).data;
        result = { [result.keyProp]: result.base64Image };
        console.log(result);
        resultArray.push(result);
      }
      await setOcrResults(
        resultArray.map((x) => {
          console.log(x);
          return (
            <p key={Object.keys(x)[0]}>
              {Object.keys(x)[0]}: {Object.values(x)[0]}
            </p>
          );
        })
      );
      setOpen(true);
      return;
    }
    let body = [];
    for (let i = 0; i < e.target.length - 1; i++) {
      body.push(e.target[i].value);
    }
    body = schema.reduce((acc, curr, index) => {
      acc[curr] = body[index];
      return acc;
    }, {});
    // console.log(body);
    await axios.post(`/api/${objectType}s`, body);
  };
  const handleCanvasInput = async (key, base64Image) => {
    await setImages({ ...images, [key]: base64Image });
    // console.log(key, base64Image);
  };
  const closeModal = () => setOpen(false);
  return (
    <div>
      {schema && (
        <form
          className={`form-create ${inputChoise === "Pen" ? "collumn" : ""}`}
          onSubmit={onSubmit}
        >
          {schema.map((key, index) => {
            return (
              <label key={key}>
                {key}:
                {inputChoise === "Pen" ? (
                  <PenInput
                    keyprop={key}
                    handleCanvasInput={handleCanvasInput}
                  />
                ) : (
                  <input type="text" />
                )}
              </label>
            );
          })}
          <button>
            <img alt="v-button" src={VButton} />
          </button>
          <Popup open={open} closeOnDocumentClick onClose={closeModal}>
            <div onClick={closeModal} key="popupResults">
              {ocrResults}
            </div>
          </Popup>
        </form>
      )}
    </div>
  );
};
export default UploadForm;
//plan:
//determine how many input fieds:
//new plan: here is only create. all others - will be in the list page.
// plan for today: make this create *page* fast.
// in the list page, context menu with react package.
// in the context menu, add two options - delete and update, and it will be on each row, with stop propagation option.
