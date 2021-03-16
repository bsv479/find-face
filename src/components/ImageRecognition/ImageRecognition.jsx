import React from 'react';
import './ImageRecognition.css'

const ImageRecognition = ({ imageUrl, boxes }) => {
  const img = <img id='input-image' alt='' src={imageUrl} />;
  return imageUrl ? (

    <div className='img-url-box'>
      <div className='absolute mt2'>
        {img}
      {
        boxes.map((box, idx) => (
          <div key={idx}
            className='bounding-box'
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol
            }}>
          </div>
        ))
      }
      </div>
    </div>    
  ) : null;
}

export default ImageRecognition;