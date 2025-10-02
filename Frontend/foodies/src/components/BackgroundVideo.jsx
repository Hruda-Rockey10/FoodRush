import React from "react";
import "./BackgroundVideo.css"; 

const BackgroundVideo = () => {
  return (
    <div className="video-container">
      <video autoPlay muted loop className="background-video" preload="auto" playsInline>
        <source src="/bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay" />
    </div>
  );
};

export default BackgroundVideo;