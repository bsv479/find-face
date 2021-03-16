import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className='image-link-form f3'>
      <p className='tc'>
        {`This Magic Brain will detect faces in your pictures. Give it a try.`}
      </p>

      <div className='form-container center'>
        <div className='form-box pa4 br3 shadow-5 center'>
          <input type="text" 
            onChange={onInputChange}
            className='find-input f4 pa2 w-70 center'
          />
          <button className='find-btn w-30 grow f4 ph3 pv2 dib bg-light-purple pointer'
            onClick={onButtonSubmit} >
            Detect
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm;