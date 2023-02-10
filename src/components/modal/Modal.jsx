import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import "./modal.scss";
import "boxicons"

export const Modal = (props) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  return (
    <div id={props.id} className={`modal ${active ? 'active' : ''}`}>
      {props.children}
    </div>
  );
}

Modal.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string
}

export const ModalContent = props => {

  const contentRef = useRef(null);

  const closeModal = () => {
    contentRef.current.parentNode.classList.remove('active');
    if (props.onClose) props.onClose();
  }

  return (
    <div ref={contentRef} className="modal__content">
      {props.children}
      <div className="modal__content__close" onClick={closeModal}>
        <box-icon name='x' color = "white"></box-icon>
      </div>
    </div>
  )
}

ModalContent.propTypes = {
  onClose: PropTypes.func
}