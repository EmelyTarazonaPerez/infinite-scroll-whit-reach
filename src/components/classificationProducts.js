import React from 'react'
import './css.css'

export const ClassificationProducts = ({ classifications, handleOnChange }) => {
  return (
    <div className='classifications'>
      {Object.keys(classifications).map((classification, index) => (
        <div className="classification-container" key={`checkbox-${index}`}>
          <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
            <input
              type="checkbox"
              className="btn-check"
              id={`custom-checkbox-${index}`}
              value={classification}
              name={classification}
              autoComplete="off"
              checked={classifications[classification]}
              onChange={({ target }) => handleOnChange(target.value, target.checked)}
            />

            <label className="btn btn-outline-primary" htmlFor={`custom-checkbox-${index}`}>{classification}</label>
          </div>
        </div>
      ))}

    </div>
  )
}
