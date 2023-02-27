import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "../Layout/HeaderDepartment";
import Footer from "../Layout/Footer";
import { Modal } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import TableResume from "../../components/CompanyMangeResume/TableResume/TableResume";
import useGetTableAssessData from "../../hooks/useGetTableAssessData";
const managerBlog = [
  {
    id: 1,
    image: require("./../../images/testimonials/pic1.jpg"),
    title: "Alexander Weir",
  },
  {
    id: 2,
    image: require("./../../images/testimonials/pic2.jpg"),
    title: "Jennifer Wood",
  },
  {
    id: 3,
    image: require("./../../images/testimonials/pic3.jpg"),
    title: "Melissa Hassib",
  },
  {
    id: 4,
    image: require("./../../images/testimonials/pic1.jpg"),
    title: "Joseph Macfarlan",
  },
  {
    id: 5,
    image: require("./../../images/testimonials/pic2.jpg"),
    title: "Henry Crooks",
  },
  {
    id: 6,
    image: require("./../../images/testimonials/pic3.jpg"),
    title: "James Rogers",
  },
];
function Companymanage(props) {
  const [company, setCompany] = useState(false);
  const { tableData, tableDataSelect } = useGetTableAssessData();
  const [key, setKey] = useState("Apply");
  return (
    <>
      <Header2 />
      <div className='page-content bg-white'>
        <div className='content-block'>
          <div className='section-full bg-white p-t50 p-b20'>
            <div className='container'>
              <div className='m-b30'>
                <div className='job-bx browse-job clearfix'>
                  <div className='job-bx-title  clearfix'>
                    <h5 className='font-weight-700 pull-left text-uppercase'>
                      Ứng viên đã ứng tuyển
                    </h5>
                    <div className='float-right input-group w-auto'>
                      <span className='select-title'>Lọc theo</span>
                      <select className='form-control'>
                        <option>All</option>
                        <option>Chức danh 1</option>
                        <option>Chức danh 2</option>
                        <option>Chức danh 3</option>
                      </select>
                    </div>
                  </div>
                  <Tabs
                    id='controlled-tab-example'
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className='mb-3'
                  >
                    <Tab eventKey='Apply' title='Apply'>
                      <ul className='cv-manager'>
                        <TableResume tableData={tableData} />
                      </ul>
                    </Tab>
                    <Tab eventKey='Select' title='Select'>
                      <ul className='cv-manager'>
                        <TableResume tableData={tableDataSelect} />
                      </ul>
                    </Tab>
                  </Tabs>

                  {/* pagination */}
                  <div className='pagination-bx m-t30 float-right'>
                    <ul className='pagination'>
                      <li className='previous'>
                        <Link to={"#"}>
                          <i className='ti-arrow-left'></i> Prev
                        </Link>
                      </li>
                      <li className='active'>
                        <Link to={"#"}>1</Link>
                      </li>
                      <li>
                        <Link to={"#"}>2</Link>
                      </li>
                      <li>
                        <Link to={"#"}>3</Link>
                      </li>
                      <li className='next'>
                        <Link to={"#"}>
                          Next <i className='ti-arrow-right'></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* modal book interview */}
                  <Modal
                    show={company}
                    onHide={setCompany}
                    className='modal fade modal-bx-info'
                  >
                    <div className='modal-dialog my-0' role='document'>
                      <div className='modal-content'>
                        <div className='modal-header'>
                          <div className='logo-img'>
                            <img
                              alt=''
                              src={require("./../../images/logo/icon2.png")}
                            />
                          </div>
                          <h5 className='modal-title'>Company Name</h5>
                          <button
                            type='button'
                            className='close'
                            onClick={() => setCompany(false)}
                          >
                            <span aria-hidden='true'>&times;</span>
                          </button>
                        </div>
                        <div className='modal-body'>
                          <ul>
                            <li>
                              <strong>Job Title :</strong>
                              <p> Web Developer – PHP, HTML, CSS </p>
                            </li>
                            <li>
                              <strong>Experience :</strong>
                              <p>5 Year 3 Months</p>
                            </li>
                            <li>
                              <strong>Deseription :</strong>
                              <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry has been the industry's
                                standard dummy text ever since.
                              </p>
                            </li>
                          </ul>
                        </div>
                        <div className='modal-footer'>
                          <button
                            type='button'
                            className='btn btn-secondary'
                            onClick={() => setCompany(false)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Companymanage;
