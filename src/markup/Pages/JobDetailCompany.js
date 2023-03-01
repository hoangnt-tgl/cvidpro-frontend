import React, { useEffect, useState } from "react";
import Header from "../Layout/HeaderDepartment";
import { Link, useLocation, useParams } from "react-router-dom";
import Footer from "../Layout/Footer";
import PageTitle from "../Layout/PageTitle";
import { gẹtJobDetail } from "../../services/CompanyApi";
import { Accordion, Card, Button, Nav, Form, Container } from "react-bootstrap";
import { getListQuestion } from "../../services/GetListService";
import "../../css/layout.css"

var bnr = require("./../../images/banner/bnr1.jpg");

function Jobdetail() {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchJobDetail = async () => {
      gẹtJobDetail(id).then((res) => {
        setJob(res.data);
      });
      getListQuestion().then((res) => {
        setQuestions(res.data);
      });
    };
    fetchJobDetail();
  }, []);
  return (
    <>
      <Header />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full content-inner-1">
            <div className="container">
              <div className="row">
                <div className="col-lg-4">
                  <div className="sticky-top">
                    <div className="row">
                      <div className="col-lg-12 col-md-6">
                        <div className="m-b30">
                          <img
                            src={require("./../../images/blog/grid/pic1.jpg")}
                            alt=""
                          />
                        </div>
                      </div>
                      <div>
                      <h5 className="font-weight-3400">Mô tả việc</h5>
                      <div className="dez-divider divider-2px bg-gray-dark mb-4 mt-0"></div>
                      </div>
                       <div>
                       <h5 className="font-weight-3400">Mô tả </h5>
                        <div className="dez-divider divider-2px bg-gray-dark mb-4 mt-0"></div>
                       </div>

                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="job-info-box">
                    <h3 className="m-t0 m-b10 font-weight-700 title-head">
                      <Link to={"#"} className="text-secondry m-r30">
                        {job?.title}
                      </Link>
                    </h3>
                    <ul className="job-info">
                      <li>
                        <strong>Chức vụ:</strong> {job?.position}
                      </li>
                      <li>
                        <strong>Số lượng:</strong> {job?.quantity}
                      </li>
                      <li>
                        <i className="ti-location-pin text-black m-r5"></i>{" "}
                        {job?.location}
                      </li>
                    </ul>
                    <p className="p-t20">
                      {/* Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum. */}
                    </p>
                    

                    <p
                      dangerouslySetInnerHTML={{ __html: job?.description }}
                    ></p>
                    {/* <h5 className="font-weight-600">How to Apply</h5>
                    <div className="dez-divider divider-2px bg-gray-dark mb-4 mt-0"></div>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages.
                    </p> */}
                    <h5 className="font-weight-600">Chuyên nghành</h5>
                    <div className="dez-divider divider-2px bg-gray-dark mb-4 mt-0"></div>
                    <ul className="list-num-count no-round">
                      {job?.major?.map((item, index) => (
                        <li>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Container className="mt-4">
        <div className="tieuchi">
        <Accordion>
          <Card border="primary">
            <Card.Header className="d-flex w-100 py-1">
              <Nav.Item className="mr-auto h4 fw" as={Nav.Item}>
                Tiêu chí đánh giá
              </Nav.Item>
              <Nav.Item className="align-self-center" style={{ width: "50px" }}>
                Điểm
              </Nav.Item>
            </Card.Header>
          </Card>
          {questions.map((question, index) => {
            return (
              <Card border="primary" className="tieuchi2">
                <Card.Header className="d-flex w-100 py-1">
                  <Accordion.Toggle
                    as={Nav.Link}
                    eventKey={index + 1}
                    className="mr-auto"
                  >
                    {index + 1 + ". " + question.name}{" "}
                    <i className="fa fa-question-circle ms-0"></i>
                  </Accordion.Toggle>
                  <Form.Control type="number" min="0" max="10" style={{maxWidth: '50px'}}></Form.Control>
                </Card.Header>
                <Accordion.Collapse eventKey={index + 1}>
                  <Card.Body className="border-top">
                    {question.detail.map((item, index2) => {
                      return (
                        <>
                          <Nav.Item>{item}</Nav.Item>
                        </>
                      );
                    })}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            );
          })}
        </Accordion>
        </div>
        
      </Container>
      </div>
      
      <Footer />
    </>
  );
}
export default Jobdetail;
