import React, { useState } from "react";
import Modal from "react-modal";
import FormSingerControls from "../FormSingerControls";
import "./styles.scss";
const SingerControls = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="controls">
      <button className="btn btn--blue" onClick={() => setIsOpen(true)}>
        <i className="fas fa-plus-square"></i>
        Thêm ca sĩ
      </button>
      <Modal
        isOpen={isOpen}
        aria={{
          labelledby: "heading",
          //   describedby: "full_description",
        }}
        appElement={document.getElementById("root")}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            position: "absolute",
            width: "100%",
            height: "500px",
            top: "50%",
            left: "50%",
            padding: "20px 40px",
            transform: "translate(-50%, -50%)",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
          },
        }}
      >
        <div className="controls-header">
          <h4 className="controls-header__heading">Thêm ca sĩ</h4>
          <button className="btn btn--danger" onClick={() => setIsOpen(false)}>
            Thoát
          </button>
        </div>
        <FormSingerControls />
      </Modal>
    </div>
  );
};

SingerControls.propTypes = {};

export default SingerControls;
