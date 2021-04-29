import { useRef } from "react";
import SignaturePad from "react-signature-canvas";
const PenInput = ({ keyprop, handleCanvasInput }) => {
  const sigCanvas = useRef(null);

  const clear = (e) => {
    e.stopPropagation();
    sigCanvas.current.clear();
  };
  const save = (e) => {
    e.stopPropagation();
    handleCanvasInput(
      keyprop,
      sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")
    );
    console.log(keyprop);
  };

  return (
    <div>
      {sigCanvas && (
        <div className="penCanvas">
          <br />
          <SignaturePad
            ref={sigCanvas}
            penColor="black"
            canvasProps={{
              width: 340,
              height: 85,
              className: "signatureCanvas",
              throttle: 0,
            }}
            backgroundColor="rgba(255,255,255,1)"
          />
          <button type="button" onClick={clear}>
            reset
          </button>
          <button type="button" onClick={save}>
            send
          </button>
        </div>
      )}
    </div>
  );
};
export default PenInput;
