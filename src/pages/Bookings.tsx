import React, { useState } from "react";

function MultiImageUpload() {
  const [images, setImages] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files); // تحويل الـ FileList إلى Array
    setImages((prevImages) => [...prevImages, ...files]);
  };

  return (
    <div>
      <h1>Upload Multiple Images</h1>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={URL.createObjectURL(image)}
              alt={`preview-${index}`}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MultiImageUpload;
