import React from "react";
import { downloadImage } from "../utils/downloadImage";
import { download } from "../assets";
import "./card.css";

const Card = (props) => {
  return (
    <div className="post-card">
      <img className="post-image" src={props.photo} alt={props.prompt} />
      
      <div className="post-info">
        <div className="post-creator"><b>{props.name}</b></div>
        <p className="post-prompt">{props.prompt}</p>
        <img
          onClick={() => downloadImage(props.prompt, props.photo)}
          src={download}
          alt="download"
          className="download-icon"
        />
      </div>
    </div>
  );
};

export default Card;
