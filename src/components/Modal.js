import React from "react";

const Modal = (props) => {
  return (
    <div className="modalOuter">
      <div className="modalOverlay"></div>
      <div className="modalInner">
        <div className="modalHeader d-flex f-justify-between f-align-center">
          <h3>{props.header}</h3>
          <button className="btn-inline closeModalBtn" onClick={()=>props.setClose(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              data-name="Layer 1"
              viewBox="0 0 122.88 122.88"
            >
              <path
                className="cls-1"
                fill="#fff"
                fillRule="evenodd"
                d="M6,6H6a20.53,20.53,0,0,1,29,0l26.5,26.49L87.93,6a20.54,20.54,0,0,1,29,0h0a20.53,20.53,0,0,1,0,29L90.41,61.44,116.9,87.93a20.54,20.54,0,0,1,0,29h0a20.54,20.54,0,0,1-29,0L61.44,90.41,35,116.9a20.54,20.54,0,0,1-29,0H6a20.54,20.54,0,0,1,0-29L32.47,61.44,6,34.94A20.53,20.53,0,0,1,6,6Z"
              />
            </svg>
          </button>
        </div>
        <div className="modalBody">{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
