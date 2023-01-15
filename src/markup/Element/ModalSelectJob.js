import React from "react";
import { Modal } from "react-bootstrap";
import { createOrder } from "../../services/OrderApi";
function ModalSelectJob(props) {
    const [rating, setRating] = React.useState("A");
    const [comment, setComment] = React.useState("Đánh giá");
  const handleSelect = () => {
    
    
    let newOrder = {
      jobId: props.jobId,
      employeeId: props.employeeId,
      sender: props.sender,
      rating: "A",
      comment: "Đánh giá",
    };
    console.log("comment", newOrder);
    createOrder(newOrder);
    setRating("A");
    setComment("Đánh giá");
    props.setShow(false);
  };

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.setShow}
        className="modal fade modal-bx-info editor"
      >
        <div className="modal-dialog m-0" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ResumeheadlineModalLongTitle">
                Chọn ứng viên
              </h5>
              <button
                type="button"
                className="close"
                onClick={() => props.setShow(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* /// Chọn xếp hạng A, B, C cho job */}
              <div className="form-group">
                <label className="form-label">Xếp hạng</label>
                <select className="form-control" value={rating} onChange={(e)=>setRating(e.target.value)}>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>
              {/* /// Đánh giá textarea */}
              <div className="form-group">
                <label className="form-label">Đánh giá</label>
                <textarea className="form-control" rows="5" onChange={(e)=>setComment(e.target.value)}>{comment}</textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => props.setShow(false)}
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="site-button"
                onClick={handleSelect}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default ModalSelectJob;
