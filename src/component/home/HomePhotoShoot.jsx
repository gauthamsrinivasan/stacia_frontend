import React from "react";
import photo1 from "../../assets/images/home-photo-1.webp";

import "./HomePhotoShoot.css";

function HomePhotoShoot() {
  return (
    <div className="photoshoot-container">
      <span className="model-photo_wrapper boy">
        <img src={photo1} className="model-photo" alt="model photograph" />
      </span>
     
    </div>
  );
}

export default HomePhotoShoot;
