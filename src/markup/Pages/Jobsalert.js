import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Header2 from "./../Layout/HeaderEmployee";
import Footer from "./../Layout/Footer";
import Profilesidebar from "./../Element/Profilesidebar";

const jobAlert = [
  { id: 1, title: "Social Media Expert", date: "December 15,2018" },
  { id: 2, title: "Web Designer", date: "November 10,2018" },
  { id: 3, title: "Finance Accountant", date: "October 5,2018" },
  { id: 4, title: "Social Media Expert", date: "December 15,2018" },
  { id: 5, title: "Web Designer", date: "November 10,2018" },
  { id: 6, title: "Finance Accountant", date: "October 5,2018" },
  { id: 7, title: "Social Media Expert", date: "December 15,2018" },
  { id: 8, title: "Web Designer", date: "November 10,2018" },
  { id: 9, title: "Finance Accountant", date: "October 5,2018" },
  { id: 10, title: "Social Media Expert", date: "December 15,2018" },
];

function Jobsalert(props) {
  const [company, setCompany] = useState(false);
  const [contacts, setContacts] = useState(jobAlert);
  // delete data
  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];
    const index = contacts.findIndex((contact) => contact.id === contactId);
    newContacts.splice(index, 1);
    setContacts(newContacts);
  };
  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="m-b30">
                <div className="job-bx table-job-bx browse-job clearfix">
                  <div className="job-bx-title clearfix">
                    <h5 className="font-weight-700 pull-left text-uppercase">
                      Lời mời
                    </h5>
                  </div>
                  <ul className="cv-manager w-100">
                    {contacts.map((contact, index) => (
                      <li key={index}>
                        <div className="d-flex float-left">
                          <div className="job-post-info">
                            <h6>
                              <Link to={"#"}>{contact.title}</Link>
                            </h6>
                            <ul>
                              <li>
                                <i className="fa fa-bookmark-o"></i> Full Time
                              </li>
                              <li>
                                <i className="fa fa-map-marker"></i> Sacramento,
                                California
                              </li>

                              <li>
                                <i className="fa fa-clock-o"></i> 11 days ago
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="job-links action-bx">
                          <Link to={"/files/pdf-sample.pdf"} target="blank">
                            <i className="fa fa-download"></i>
                          </Link>
                          <Link
                            to={"#"}
                            onClick={() => handleDeleteClick(contact.id)}
                          >
                            <i className="ti-trash"></i>
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <Modal
                  show={company}
                  onHide={setCompany}
                  className=" fade modal-bx-info"
                >
                  <div role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <div className="logo-img">
                          <img
                            alt=""
                            src={require("./../../images/logo/icon2.png")}
                          />
                        </div>
                        <h5 className="modal-title">Company Name</h5>
                        <button
                          type="button"
                          className="close"
                          onClick={() => setCompany(false)}
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
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
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
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
      <Footer />
    </>
  );
}
export default Jobsalert;
