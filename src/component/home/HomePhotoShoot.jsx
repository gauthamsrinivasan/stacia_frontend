import React from "react";
import photo2 from "../../assets/images/photo2.jpg";

import "./HomePhotoShoot.css";

function HomePhotoShoot() {
  return (
    <div className="photoshoot-container">
      <span className="model-photo_wrapper boy">
        <img src={photo2} className="model-photo" alt="model photograph" />
      </span>
     
    </div>
  );
}

export default HomePhotoShoot;
