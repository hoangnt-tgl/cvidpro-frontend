import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="container" style={{ maxWidth: '1560px' }}>
          <div className="row">
            <div className="col-xl-5 col-lg-4 col-md-12 col-sm-12">
              <div className="widget">
                <img
                  src={require('./../../images/logo-white.png')}
                  width="180"
                  className="m-b15"
                  alt=""
                />
                <p className="text-capitalize m-b20">
                  - ĐƠN VỊ QUẢN LÝ VÀ VẬN HÀNH:
                </p>
                <p className="text-capitalize m-b20">CÔNG TY CỔ PHẦN BERMUDA</p>
                <p className="text-capitalize m-b20">
                  Địa chỉ: 33 đường S9, Phường Tây Thạnh, Quận Tân Phú, TpHCM,
                  Việt Nam
                </p>
                <p className="text-capitalize m-b20">MST: 00000000</p>
                <p className="text-capitalize m-b20">Số điện thoại: 19001033</p>
                <p className="text-capitalize m-b20">- CHỨNG NHẬN: </p>
                <p className="text-capitalize m-b20">
                  Giấy phép đăng ký kinh doanh: GĐKKD số
                </p>
                <p className="text-capitalize m-b20">
                  Giấy phép kinh doanh thương mại điện tử: Giấy phép số
                </p>
                <p className="text-capitalize m-b20">
                  Thông báo với Bộ Công Thương: Đã thông báo
                </p>
                {/* <p className="text-capitalize m-b20">- THÔNG TIN LIÊN HỆ:</p>
                <p className="text-capitalize m-b20">Liên hệ: </p>
                <p className="text-capitalize m-b20">Số hotline: </p>
                <p className="text-capitalize m-b20">Email: </p> */}
                <div className="subscribe-form m-b20">
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
                </div>
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
            <div className="col-xl-5 col-lg-5 col-md-8 col-sm-8 col-12">
              <div className="widget border-0">
                <h5 className="m-b30 text-white">Frequently Asked Questions</h5>
                <ul className="list-2 list-line">
                  <li>
                    <Link to={''}>Privacy & Seurty</Link>
                  </li>
                  <li>
                    <Link to={''}>Terms of Serice</Link>
                  </li>
                  <li>
                    <Link to={''}>Communications</Link>
                  </li>
                  <li>
                    <Link to={''}>Referral Terms</Link>
                  </li>
                  <li>
                    <Link to={''}>Lending Licnses</Link>
                  </li>
                  <li>
                    <Link to={''}>Support</Link>
                  </li>
                  <li>
                    <Link to={''}>How It Works</Link>
                  </li>
                  <li>
                    <Link to={''}>For Employers</Link>
                  </li>
                  <li>
                    <Link to={''}>Underwriting</Link>
                  </li>
                  <li>
                    <Link to={''}>Contact Us</Link>
                  </li>
                  <li>
                    <Link to={''}>Lending Licnses</Link>
                  </li>
                  <li>
                    <Link to={''}>Support</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-12">
              <div className="widget border-0">
                <h5 className="m-b30 text-white">Find Jobs</h5>
                <ul className="list-2 w10 list-line">
                  <li>
                    <Link to={''}>US Jobs</Link>
                  </li>
                  <li>
                    <Link to={''}>Canada Jobs</Link>
                  </li>
                  <li>
                    <Link to={''}>UK Jobs</Link>
                  </li>
                  <li>
                    <Link to={''}>Emplois en Fnce</Link>
                  </li>
                  <li>
                    <Link to={''}>Jobs in Deuts</Link>
                  </li>
                  <li>
                    <Link to={''}>Vacatures China</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <span>
                {' '}
                © Copyright by{' '}
                <i className="fa fa-heart m-lr5 text-red heart"></i>
                <Link to={''}>DexignZone </Link> All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
