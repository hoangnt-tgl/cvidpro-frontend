import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="container" style={{ maxWidth: '1560px' }}>
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
              <div className="widget">
                <img
                  src={require('./../../images/logo-white.png')}
                  width="180"
                  className="m-b30"
                  alt=""
                />

                {/* <div className="subscribe-form m-b20">
                  <form
                    className="dzSubscribe"
                    action="script/mailchamp.php"
                    method="post"
                  >
                    <div className="dzSubscribeMsg"></div>
                    <div className="input-group">
                      <input
                        name="dzEmail"
                        required="required"
                        className="form-control"
                        placeholder="Your Email Address"
                        type="email"
                      />
                      <span className="input-group-btn">
                        <button
                          name="submit"
                          value="Submit"
                          type="submit"
                          className="site-button radius-xl"
                        >
                          Subscribe
                        </button>
                      </span>
                    </div>
                  </form>
                </div> */}
                <ul className="list-inline m-a0">
                  <li>
                    <Link
                      to={''}
                      className="site-button white facebook circle "
                    >
                      <i className="fa fa-facebook"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={''}
                      className="site-button white google-plus circle "
                    >
                      <i className="fa fa-google-plus"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={''}
                      className="site-button white linkedin circle "
                    >
                      <i className="fa fa-linkedin"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={''}
                      className="site-button white instagram circle "
                    >
                      <i className="fa fa-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to={''} className="site-button white twitter circle ">
                      <i className="fa fa-twitter"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12">
              <div className="widget border-0">
                <h6 className="m-b15 text-white font-weight-bold">
                  ERMUDA CORP
                </h6>
                <ul className="list-2 w10 list-line">
                  <li>
                    <Link to={''}>Về chúng tôi</Link>
                  </li>
                  <li>
                    <Link to={''}>Chính sách</Link>
                  </li>
                  <li>
                    <Link to={''}>Điều khoản</Link>
                  </li>
                  <li>
                    <Link to={''}>Liên hệ</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12">
              <div className="widget border-0">
                <h6 className="m-b15 text-white font-weight-bold">
                  Dành cho ứng viên
                </h6>
                <ul className="list-2 w10 list-line">
                  <li>
                    <Link to={''}>Việc Làm</Link>
                  </li>
                  <li>
                    <Link to={''}>Công ty</Link>
                  </li>
                  <li>
                    <Link to={''}>Cẩm nang việc làm</Link>
                  </li>
                  <li>
                    <Link to={''}>Emplois en Fnce</Link>
                  </li>
                  <li>
                    <Link to={''}>Mẫu CV</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12">
              <div className="widget border-0">
                <h6 className="m-b15 text-white font-weight-bold">
                  Dành cho nhà tuyển dụng
                </h6>
                <ul className="list-2 w10 list-line">
                  <li>
                    <Link to={''}>Dịch vụ nhân sự</Link>
                  </li>
                  <li>
                    <Link to={''}>Cẩm nang tuyển dụng</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="row widthFooter">
          <div className="col-lg-12">
            {/* <span>
                {' '}
                © Copyright by{' '}
                <i className="fa fa-heart m-lr5 text-red heart"></i>
                <Link to={''}>DexignZone </Link> All rights reserved.
              </span> */}
            <p
              className="text-capitalize m-b10 font-weight-bold font-16"
              style={{ color: '#fff' }}
            >
              CÔNG TY CỔ PHẦN BERMUDA
            </p>
            <p className="text-capitalize m-b10">
              Địa chỉ: 33 đường S9, Phường Tây Thạnh, Quận Tân Phú, TpHCM, Việt
              Nam
            </p>
            <p className="text-capitalize m-b10">
              Hotline: 19001033 - Email: bermudacorp@gmail.com
            </p>
            <p className="text-capitalize m-b10">
              Giấy phép đăng ký kinh doanh: GĐKKD số
            </p>
            <p className="text-capitalize m-b10">
              Giấy phép kinh doanh thương mại điện tử: Giấy phép số
            </p>
            <p className="text-capitalize m-b0">
              Thông báo với Bộ Công Thương: Đã thông báo
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
