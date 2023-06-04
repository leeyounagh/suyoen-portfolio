import React from "react";
import "../styles/projectvideo.css";
import ValueShare from "../assets/valueshare.mp4";
import SamSamFarm from "../assets/samsamfarm.mp4";
import HelloJeju from "../assets/메인.mp4";

export default function ProjectVideo() {
  const videoList = [ValueShare, SamSamFarm, HelloJeju];
  return (
    <aside className="videoWrapper">
      <video className="background-video" autoPlay loop muted>
        <source src={ValueShare} type="video/mp4" />
      </video>
    </aside>
  );
}
