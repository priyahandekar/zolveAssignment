import React from "react";
import Webcam from "react-webcam";

const WebcamCapture = () => {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot({ width: 150, height: 150 });
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

    return (
        <div>
            <Webcam
                style={{ width: 150, height: 150, display: 'flex', flexDirection: 'column', marginLeft: '12px' }}
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
            />
            <button style={{margin: '0 0 12px 12px'}} onClick={capture}>Capture photo</button>
            <div>
                {imgSrc && (
                    <img style={{marginLeft: '12px'}}
                        src={imgSrc}
                    />
                )}
            </div>
        </div>

    );
};

export default WebcamCapture;