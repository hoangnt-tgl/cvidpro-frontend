import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "./styles.css";
const QuestionMark = ({ description, placement }) => {
  return (
    <div className='mx-1 d-inline'>
      <OverlayTrigger
        placement={placement}
        overlay={<Tooltip id={`tooltip-top`}> {description}</Tooltip>}
      >
        <i className='fa fa-question-circle ms-0'></i>
      </OverlayTrigger>
    </div>
  );
};

export default QuestionMark;
