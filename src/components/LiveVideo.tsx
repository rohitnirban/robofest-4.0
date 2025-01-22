import React from "react";

const LiveVideo = () => {
    return (
        <div>
            <video
                controls
                autoPlay
                muted
                style={{ width: "100%", maxWidth: "800px" }}
            >
                <source src="/api/video" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default LiveVideo;
