import React, { useEffect, useState } from "react";
import Header from "../Layout/HeaderDepartment";
import { Link, useLocation, useParams } from "react-router-dom";
import Footer from "../Layout/Footer";
import PageTitle from "../Layout/PageTitle";
import { gẹtJobDetail } from "../../services/CompanyApi";

var bnr = require("./../../images/banner/bnr1.jpg");

const blogGrid = [
  {
    image: require("./../../images/blog/grid/pic1.jpg"),
  },
  {
    image: require("./../../images/blog/grid/pic2.jpg"),
  },
  {
    image: require("./../../images/blog/grid/pic3.jpg"),
  },
  {
    image: require("./../../images/blog/grid/pic4.jpg"),
  },
];

function Jobdetail() {
  const { id } = useParams();
  const [job, setJob] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchJobDetail = async () => {
      const { data } = await gẹtJobDetail(id);
      setJob(data);
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
                      <div className="col-lg-12 col-md-6">
                        <div className="widget bg-white p-lr20 p-t20  widget_getintuch radius-sm">
                          <h4 className="text-black font-weight-700 p-t10 m-b15">
                            Mô tả công việc
                          </h4>
                          <ul>
                            <li>
                              <i className="ti-location-pin"></i>
                              <strong className="font-weight-700 text-black">
                                Địa chỉ
                              </strong>
                              <span className="text-black-light">
                                {job?.location}
                              </span>
                            </li>
                            <li>
                              <i className="ti-money"></i>
                              <strong className="font-weight-700 text-black">
                                Mức lương
                              </strong>{" "}
                              Lương thỏa thuận
                            </li>
                            <li>
                              <i className="ti-shield"></i>
                              <strong className="font-weight-700 text-black">
                                Kinh nghiệm
                              </strong>
                              {job?.experience}
                            </li>
                          </ul>
                        </div>
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
                    <h5 className="font-weight-600">Mô tả công việc</h5>
                    <div className="dez-divider divider-2px bg-gray-dark mb-4 mt-0"></div>
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
                    <Link to={"/jobs-applied-job"} className="site-button">
                      Ứng tuyển
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section-full content-inner">
            <div className="container">
              <div className="row">
                {/* {blogGrid.map((item, index) => (
                  <div className="col-xl-3 col-lg-6 col-md-6" key={index}>
                    <div className="m-b30 blog-grid">
                      <div className="dez-post-media dez-img-effect ">
                        {" "}
                        <Link to={"/blog-details"}>
                          <img src={item.image} alt="" />
                        </Link>{" "}
                      </div>
                      <div className="dez-info p-a20 border-1">
                        <div className="dez-post-title ">
                          <h5 className="post-title">
                            <Link to={"/blog-details"}>Title of blog post</Link>
                          </h5>
                        </div>
                        <div className="dez-post-meta ">
                          <ul>
                            <li className="post-date">
                              {" "}
                              <i className="ti-location-pin"></i> London{" "}
                            </li>
                            <li className="post-author">
                              <i className="ti-user"></i>By{" "}
                              <Link to={"#"}>Jone</Link>{" "}
                            </li>
                          </ul>
                        </div>
                        <div className="dez-post-text">
                          <p>
                            All the Lorem Ipsum generators on the Internet tend
                            to repeat predefined chunks.
                          </p>
                        </div>
                        <div className="dez-post-readmore">
                          <Link
                            to={"/blog-details"}
                            title="READ MORE"
                            rel="bookmark"
                            className="site-button-link"
                          >
                            <span className="fw6">READ MORE</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Jobdetail;
