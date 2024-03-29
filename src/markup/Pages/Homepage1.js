import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import NewHeader from "../../components/Layout/Header/Header.jsx";
import Footer from "./../Layout/Footer";
import CountUp from "react-countup";
import IndexBanner from "./../Element/IndexBanner";
import Jobcategories from "./../Element/Jobcategories";
import Featureblog from "./../Element/Featureblog";
import Jobsection from "./../Element/Jobsection";
import Owltestimonial from "./../Element/Owlblog1";
import { getCountCompany } from "./../../services/CompanyApi";
import { getCountResume } from "./../../services/EmployeeApi";
import { store } from "./../../store/store";
import useScroll from "../../hooks/useScroll";

//Images
var bnr2 = require("./../../images/background/bg4.jpg");
var bnr3 = require("./../../images/lines.png");

function Homepage() {
  const { containerRef, isStick, navContainerRef } = useScroll();
  const [countCompany, setCountCompany] = useState(0);
  const [countResume, setCountResume] = useState(0);
  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchData() {
      let count = await getCountCompany();
      setCountCompany(count);
      let countResume = await getCountResume();
      setCountResume(countResume);
    }
    fetchData();
  }, []);
  return (
    <div ref={containerRef} className='page-wraper' style={{ height: "200vh" }}>
      {/* <Header /> */}
      <NewHeader isStick={isStick} navContainerRef={navContainerRef} />
      <div className='page-content'>
        <div
          className='section-full job-categories content-inner-2 bg-white'
          style={{ display: "none" }}
        >
          <div className='container'>
            <div className='section-head d-flex head-counter clearfix'>
              {/* <div className="mr-auto">
								<h2 className="m-b5">Popular Categories</h2>
								<h6 className="fw3">20+ Catetories work wating for you</h6>
							</div> */}
              <div className='head-counter-bx'>
                <h2 className='m-b5 counter'>
                  <CountUp end={countResume} duration={5} />
                </h2>
                <h6 className='fw3'>CVID</h6>
              </div>
              <div className='head-counter-bx'>
                <h2 className='m-b5 counter'>
                  <CountUp end={countCompany} duration={5} />
                </h2>
                <h6 className='fw3'>Doanh nghiệp</h6>
              </div>
              <div className='head-counter-bx'>
                <h2 className='m-b5 counter'>
                  <CountUp end={0} duration={5} />
                </h2>
                <h6 className='fw3'>Vị trí</h6>
              </div>
            </div>
          </div>
        </div>

        <div
          className='section-full content-inner-2 overlay-white-middle'
          style={{
            backgroundImage: "url( " + bnr3 + ")",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
          }}
        >
          <div className='container'>
            <div className='section-content box-sort-in button-example'>
              <div className='pricingtable-row'>
                <div className='row max-w1000 m-auto'>
                  <div className='col-sm-12 col-md-6 col-lg-6 p-lr0'>
                    <div className='pricingtable-wrapper style2 bg-white'>
                      <div className='pricingtable-inner'>
                        <div className='pricingtable-price'>
                          <h4 className='font-weight-300 m-t10 m-b0'>
                            Người tìm việc
                          </h4>
                        </div>
                        <div className='m-t20'>
                          <Link
                            to={"/employee/login"}
                            className='site-button radius-xl'
                          >
                            <span className='p-lr30'>Đăng nhập</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='col-sm-12 col-md-6 col-lg-6 p-lr0'>
                    <div className='pricingtable-wrapper style2 bg-white'>
                      <div className='pricingtable-inner'>
                        <div className='pricingtable-price'>
                          <h4 className='font-weight-300 m-t10 m-b0'>
                            Nhà tuyển dụng
                          </h4>
                          {/* <div className="pricingtable-bx"> $  <span>29</span> /  Per Installation </div> */}
                        </div>
                        {/* <p>Lorem ipsum dolor sit amet adipiscing elit sed do eiusmod tempors labore et dolore magna siad enim aliqua</p> */}
                        <div className='m-t20'>
                          <Link
                            to={"/company/login"}
                            className='site-button radius-xl'
                          >
                            <span className='p-lr30'>Đăng nhập</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Homepage;
