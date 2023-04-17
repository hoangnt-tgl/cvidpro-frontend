import React from "react";
import { Modal } from "react-bootstrap";
const ModalMoreOption = ({
  isShowModal,
  setIsShowModal,
  newQuestion,
  setNewQuestion,
  childQuestion,
  setChildQuestion,
  handleAddQuestion,
}) => {
  return (
    <>
      {" "}
      <Modal
        show={isShowModal}
        onHide={() => setIsShowModal(false)}
        className='modal fade modal-bx-info'
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm tiêu chí đánh giá</Modal.Title>
        </Modal.Header>
        <Modal.Body className="font-size-14">
          <div className='form-group'>
            <p for=''>Tên tiêu chí</p>
            <input
              type='text'
              className='form-control' //form-control-sm
              value={newQuestion.name}
              onChange={(e) => {
                setNewQuestion({ ...newQuestion, name: e.target.value });
              }}
            />
          </div>
          <div className='form-group'>
            <p for=''>Tiêu chí con</p>
            {newQuestion.detail.map((item, index) => {
              return (
                <>
                  <input
                    type='text'
                    className='form-control mb-2'
                    value={item}
                  />
                </>
              );
            })}
            <input
              type='text'
              className='form-control'
              value={childQuestion}
              onChange={(e) => setChildQuestion(e.target.value)}
            />
            <button
              className='btn btn-primary mt-2'
              onClick={() => {
                if (childQuestion === "") return;
                setNewQuestion({
                  ...newQuestion,
                  detail: [...newQuestion.detail, childQuestion],
                });
                setChildQuestion("");
              }}
            >
              Thêm tiêu chí con
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type='button'
            className='btn btn-primary'
            onClick={handleAddQuestion}
          >
            Lưu
          </button>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={() => setIsShowModal(false)}
          >
            Hủy
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalMoreOption;
