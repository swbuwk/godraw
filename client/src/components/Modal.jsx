import React from 'react'
import "../styles/modal.scss"

const Modal = ({children}) => {
  return (
    <div className='modal_bg'>
        <div className='modal'>
            {children}
        </div>
    </div>
  )
}

export default Modal