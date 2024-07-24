import React from 'react';

const SketchfabEmbed = () => {
  return (
    <div className="sketchfab-embed-wrapper">
      <iframe
        title="Mercedes-Benz CLS [w219]"
        frameBorder="0"
        allowFullScreen
        mozAllowFullScreen="true"
        webkitAllowFullScreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        xr-spatial-tracking
        execution-while-out-of-viewport
        execution-while-not-rendered
        web-share
        width="640"
        height="480"
        src="https://sketchfab.com/models/3b11611c6d06415b82b96495f5f249ce/embed?autostart=1&preload=1"
      ></iframe>
    </div>
  );
};

export default SketchfabEmbed;
