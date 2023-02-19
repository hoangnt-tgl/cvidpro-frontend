import React, { useState } from "react";
import { Link } from "react-router-dom";
import { deleteJobForDepartment } from "../../../services/CompanyApi";
import ModalInfoNeededPosi from "../ModalInfoNeededPosi/ModalInfoNeededPosi";

const ItemListNeededPostion = ({ item, keyDepart }) => {
  const [isShowModalInfo, setIsShowModalInfo] = useState(false);
  function getStatusJob(job) {
    if (job.confirm1.confirmed === -1) return "Không được duyệt";
    if (job.confirm2.confirmed !== 1) return "Đang chờ duyệt";
    if (job.status === 0) return "Dừng tuyển";
    if (job.status === 1) return "Đang tuyển";
  }
  const handleDeleteJob = async (idJob) => {
    await deleteJobForDepartment(keyDepart, idJob);
    // setReload(!reload);
  };
  function handleToggleModalCompany() {
    setIsShowModalInfo(!isShowModalInfo);
  }
  return (
    <>
      <tr>
        <td className='job-name'>
          <Link to={`company/job-detail/${item._id}`} target='_blank'>
            {item.title}
          </Link>
          <ul className='job-post-info'>
            {/* <li>
                  <i className="fa fa-map-marker"></i>{" "}
                  Sacramento, California
                </li> */}
            <li>
              <i className='fa fa-bookmark-o'></i> {item.position}
            </li>
            {/* <li>
                  <i className="fa fa-filter"></i> Web Designer
                </li> */}
          </ul>
        </td>
        {/* <td className="application text-primary">
              (5) Applications
            </td> */}
        <td className='expired pending'>{getStatusJob(item)} </td>
        <td className='job-links'>
          <Link to={"#"} onClick={() => handleToggleModalCompany()}>
            <i className='fa fa-eye'></i>
          </Link>
          <Link to={"#"} onClick={() => handleDeleteJob(item._id)}>
            <i className='ti-trash'></i>
          </Link>
        </td>
      </tr>
      <ModalInfoNeededPosi
        setCompany={handleToggleModalCompany}
        company={isShowModalInfo}
        info={item}
      />
    </>
  );
};

export default ItemListNeededPostion;
