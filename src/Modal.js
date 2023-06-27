import React from 'react';
import ReactDOM from 'react-dom';

const OVERYLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.7)',
  zIndex: 1000,
};

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'rgb(34,34,34)',
  transform: 'translate(-50%,-50%)',
  zIndex: 1000,
  height: '90%',
  width: '90%',
};

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <>
      <div style={OVERYLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button
          className="btn btn-danger fs-4"
          style={{ marginLeft: '90%', marginTop: '-35px' }}
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </>,
    document.getElementById('modal-root')
  );
};

export default Modal;