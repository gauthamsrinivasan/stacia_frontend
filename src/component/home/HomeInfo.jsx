import React from "react";
import "./HomeInfo.css";
import { Link } from "react-router-dom";

function HomeInfo() {
  return (
    <article className="home-info">
      <div className="info-txt">
        <h2>
          Stacia Fashion : <br/>Unleash Your style!
        </h2>
        <p>
        Explore a world of fashion at your fingertips as we bring you the
         latest trends in men's and women's clothing, right to your doorstep. 
         Elevate your wardrobe with our curated collection of chic and timeless pieces
          designed to make you stand out in every crowd.
          <br/><br/>
          Developed by - <a href="https://www.linkedin.com/in/gauthamsrinivasan07/" target="_blank"> Gautham </a> 
        </p>
      </div>
      <button className="explore-clothing_btn">
        <Link to="explore/all">Discover Our Products</Link>
      </button>
    </article>
  );
}

export default HomeInfo;
