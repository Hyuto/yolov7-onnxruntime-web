import React, { useState, useRef } from "react";

const LocalImageButton = ({ imageRef, callback }) => {
  const [image, setImage] = useState(null);
  const inputImage = useRef(null);

  return (
    <>
      <input
        type="file"
        ref={inputImage}
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          if (image) {
            URL.revokeObjectURL(image);
            setImage(null);
          }

          const url = URL.createObjectURL(e.target.files[0]);
          imageRef.current.src = url;
          imageRef.current.onload = () => {
            callback();
          };
          setImage(url);
        }}
      />

      <div>
        <button
          style={{ margin: "0 5px" }}
          onClick={() => {
            inputImage.current.click();
          }}
        >
          Open local image
        </button>
        <button
          style={{ margin: "0 5px" }}
          onClick={() => {
            inputImage.current.value = "";
            imageRef.current.src = "#";
            URL.revokeObjectURL(image);
            setImage(null);
          }}
        >
          Close image
        </button>
      </div>
    </>
  );
};

export default LocalImageButton;
